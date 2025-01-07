import { useState } from "react";
import {
	Container,
	Header,
	Content,
	HabitList,
	HabitItem,
	HabitInfo,
	Calendar,
	HabitStats,
	StatsGrid,
	StatsBox,
	MonthlyCalendar,
} from "./styles/HabitsStyles";
import { CircularProgress } from "@mui/material";
import HabitsList from "./HabitsList";
import { Habit } from "../../interfaces";

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

	return (
		<Container>
			<Header>
				<h1>Hábitos</h1>
			</Header>

			{loading && <CircularProgress />}

			{!loading && (
				<Content>
					{/* Columna izquierda: Lista de hábitos */}
					<HabitsList habits={mockHabits} />
					{/* Columna derecha: Estadísticas y calendario mensual */}
					<HabitStats>
						<StatsGrid>
							<StatsBox>
								<h3>Hábitos completados</h3>
								<p>95%</p>
							</StatsBox>
							<StatsBox>
								<h3>Días consecutivos</h3>
								<p>150</p>
							</StatsBox>
							<StatsBox>
								<h3>Hábitos activos</h3>
								<p>4</p>
							</StatsBox>
							<StatsBox>
								<h3>Mejor racha</h3>
								<p>857 días</p>
							</StatsBox>
						</StatsGrid>
						<MonthlyCalendar>
							<h3>Vista mensual</h3>
							<div className="calendar-grid">
								{/* Renderizamos 30 días como ejemplo */}
								{Array.from({ length: 30 }).map((_, index) => (
									<div
										key={index}
										className={
											index % 2 === 0
												? "day checked"
												: "day unchecked"
										}
										onClick={() =>
											console.log(`Día ${index + 1}`)
										}
									>
										{index + 1}
									</div>
								))}
							</div>
						</MonthlyCalendar>
					</HabitStats>
				</Content>
			)}
		</Container>
	);
};

export default Habits;
