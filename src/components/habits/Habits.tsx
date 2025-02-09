import { useCallback, useEffect, useReducer, useState } from "react";
import { Container, Header, Content } from "./styles/HabitsStyles";
import { CircularProgress } from "@mui/material";
import HabitsList from "./HabitsList";
import { Habit } from "../../interfaces";
import HabitStats from "./HabitStats";
import Cookies from "js-cookie";
import { ReducerActionType as HabitsReducerActionType } from "../../actions/habits";
import { habitsReducer, initialState } from "../../reducers/habits";
import { fetchHabits } from "../../services/habitsServices";

const Habits = () => {
	const [state, dispatch] = useReducer(habitsReducer, initialState);
	const [sessionToken, setSessionToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [selectedHabit, setSelectedHabit] = useState<Habit | undefined>();

	const fetchAllHabits = useCallback(async () => {
		setLoading(true);
		try {
			const responseJson = await fetchHabits(1, 10, sessionToken);
			dispatch({
				type: HabitsReducerActionType.GET_ALL_HABITS,
				payload: responseJson.habits,
			});
		} catch (error) {
			console.error("Error fetching habits", error);
		} finally {
			setLoading(false);
		}
	}, [sessionToken]);

	useEffect(() => {
		const token = Cookies.get("PROD-APP-AUTH");
		if (token) {
			setSessionToken(token);
			fetchAllHabits();
		}
	}, [fetchAllHabits]);

	console.log(state.habits);

	return (
		<Container>
			<Header>
				<h1>Hábitos</h1>
			</Header>

			{loading && <CircularProgress />}

			{!loading && (
				<Content>
					{/* Columna izquierda: Lista de hábitos */}
					<HabitsList
						habits={state.habits}
						setSelectedHabit={setSelectedHabit}
					/>
					{/* Columna derecha: Estadísticas y calendario mensual */}
					<HabitStats selectedHabit={selectedHabit} />
					{state.habits.map((habit) => (
						<div key={habit._id}> {habit.name} </div>
					))}
				</Content>
			)}
		</Container>
	);
};

export default Habits;
