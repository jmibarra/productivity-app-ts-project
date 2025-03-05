import React from "react";
import {
	StatsBox,
	StatsGrid,
	HabitStatsContainer,
	MonthlyCalendar,
} from "./styles/HabitsStyles";
import { Habit } from "../../interfaces";
import HabitMonthRecords from "./records/HabitMonthRecors";

interface habitStatsProps {
	selectedHabit: Habit | undefined;
}

const HabitStats = ({ selectedHabit }: habitStatsProps) => {
	return (
		<HabitStatsContainer>
			<StatsGrid>
				<StatsBox>
					<h3>Registro mensual</h3>
					<p>30</p>
				</StatsBox>
				<StatsBox>
					<h3>Total de registros</h3>
					<p>150</p>
				</StatsBox>
				<StatsBox>
					<h3>Tasa de registro mensual</h3>
					<p>90%</p>
				</StatsBox>
				<StatsBox>
					<h3>Mejor racha</h3>
					<p>857 días</p>
				</StatsBox>
			</StatsGrid>
			<MonthlyCalendar>
				<h3>Vista mensual {selectedHabit?.name}</h3>
				<div className="calendar-grid">
					{selectedHabit?._id && (
						<HabitMonthRecords habitId={selectedHabit?._id} />
					)}
				</div>
			</MonthlyCalendar>
		</HabitStatsContainer>
	);
};

export default HabitStats;
