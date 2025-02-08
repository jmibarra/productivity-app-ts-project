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

/*
Interfaz de los habitos

export interface Habit {
    _id?: string;
    user_id: string; // ID del usuario
    name: string; // Nombre del hábito
    description?: string; // Descripción opcional
    icon?: string; // Identificador del icono
    goal: {
      type: "daily" | "quantity"; // Tipo de objetivo
      target: number; // Objetivo (e.g., 1 para cumplido o cantidad específica)
    };
    frequency: {
      type: "daily" | "weekly" | "interval"; // Tipo de frecuencia
      details: {
        days_of_week?: string[]; // Días específicos para 'daily'
        weekly_target?: number; // Número de días por semana para 'weekly'
        interval_days?: number; // Días entre repeticiones para 'interval'
      };
    };
    streak: number; // Días consecutivos cumplidos
    created_at?: Date;
    updated_at?: Date;
}

/*/

const mockHabits: Habit[] = [
	{
		_id: "1",
		user_id: "123",
		name: "Journaling / Objetivos del día",
		icon: "📔",
		goal: {
			type: "daily",
			target: 1,
		},
		frequency: {
			type: "daily",
			details: {
				days_of_week: [
					"monday",
					"tuesday",
					"wednesday",
					"thursday",
					"friday",
					"saturday",
					"sunday",
				],
			},
		},
		streak: 250,
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		_id: "2",
		user_id: "123",
		name: "Meditación",
		icon: "🧘",
		goal: {
			type: "daily",
			target: 1,
		},
		frequency: {
			type: "daily",
			details: {
				days_of_week: [
					"monday",
					"tuesday",
					"wednesday",
					"thursday",
					"friday",
					"saturday",
					"sunday",
				],
			},
		},
		streak: 250,
		created_at: new Date(),
		updated_at: new Date(),
	},
];

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
						habits={mockHabits}
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
