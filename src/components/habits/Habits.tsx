import { useState } from "react";
import { Container, Header, Content } from "./styles/HabitsStyles";
import { CircularProgress } from "@mui/material";
import HabitsList from "./HabitsList";
import { Habit } from "../../interfaces";
import HabitStats from "./HabitStats";

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
	const [loading, setLoading] = useState(false);
	const [selectedHabit, setSelectedHabit] = useState<Habit | undefined>();

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
				</Content>
			)}
		</Container>
	);
};

export default Habits;
