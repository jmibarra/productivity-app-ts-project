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
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const mockHabits = [
	{
		id: 1,
		name: "Journaling / Objetivos del día",
		icon: "📔",
		streak: 250,
		daysChecked: [true, true, false, true, false, false, false],
	},
	{
		id: 2,
		name: "Comer sano",
		icon: "🥗",
		streak: 483,
		daysChecked: [true, false, false, false, true, false, false],
	},
	{
		id: 3,
		name: "Hacer ejercicio",
		icon: "🏋️",
		streak: 571,
		daysChecked: [true, true, false, true, false, false, false],
	},
	{
		id: 4,
		name: "Tomar 2L de agua",
		icon: "💧",
		streak: 857,
		daysChecked: [true, true, false, true, true, false, false],
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
					<HabitList>
						{mockHabits.map((habit) => (
							<HabitItem key={habit.id}>
								<HabitInfo>
									<span>{habit.icon}</span>
									<div>
										<h3>{habit.name}</h3>
										<p>{habit.streak} días</p>
									</div>
								</HabitInfo>
								<Calendar>
									{habit.daysChecked.map((checked, index) => (
										<div
											key={index}
											className={
												checked
													? "checked"
													: "unchecked"
											}
										>
											{checked ? (
												<CheckIcon
													fontSize="small"
													color="inherit"
												/>
											) : (
												<CloseIcon
													fontSize="small"
													color="inherit"
												/>
											)}
										</div>
									))}
								</Calendar>
							</HabitItem>
						))}
					</HabitList>

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
