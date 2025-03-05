import { useCallback, useEffect, useReducer, useState } from "react";
import { Container, Header, Content } from "./styles/HabitsStyles";
import { CircularProgress } from "@mui/material";
import HabitsList from "./HabitsList";
import { Habit } from "../../interfaces";
import HabitStats from "./HabitStats";
import { ReducerActionType as HabitsReducerActionType } from "../../actions/habits";
import { habitsReducer, initialState } from "../../reducers/habits";
import { fetchHabits } from "../../services/habitsServices";

const Habits = () => {
	const [state, dispatch] = useReducer(habitsReducer, initialState);
	const [loading, setLoading] = useState(false);
	const [selectedHabit, setSelectedHabit] = useState<Habit | undefined>();

	const fetchAllHabits = useCallback(async () => {
		setLoading(true);
		try {
			const responseJson = await fetchHabits(1, 10);
			dispatch({
				type: HabitsReducerActionType.GET_ALL_HABITS,
				payload: responseJson.habits,
			});
		} catch (error) {
			console.error("Error fetching habits", error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchAllHabits();
	}, [fetchAllHabits]);

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
				</Content>
			)}
		</Container>
	);
};

export default Habits;
