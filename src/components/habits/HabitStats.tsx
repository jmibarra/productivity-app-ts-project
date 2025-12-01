import React from "react";
import {
	Box,
	Card,
	CardContent,
	Grid,
	Typography,
	Paper,
} from "@mui/material";
import { Habit } from "../../interfaces";
import HabitMonthRecords from "./records/HabitMonthRecors";

interface habitStatsProps {
	selectedHabit: Habit | undefined;
}

const StatCard = ({ title, value }: { title: string; value: string }) => (
	<Card sx={{ borderRadius: "16px", height: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
		<CardContent>
			<Typography variant="caption" color="text.secondary" fontWeight="bold" textTransform="uppercase">
				{title}
			</Typography>
			<Typography variant="h4" fontWeight="bold" color="primary.main" mt={1}>
				{value}
			</Typography>
		</CardContent>
	</Card>
);

const HabitStats = ({ selectedHabit }: habitStatsProps) => {
	if (!selectedHabit) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" height="100%">
				<Typography variant="h6" color="text.secondary">
					Selecciona un hábito para ver sus estadísticas
				</Typography>
			</Box>
		);
	}

	return (
		<Box>
			<Grid container spacing={2} mb={4}>
				<Grid size={{ xs: 6, md: 3 }}>
					<StatCard title="Registro mensual" value="30" />
				</Grid>
				<Grid size={{ xs: 6, md: 3 }}>
					<StatCard title="Total registros" value="150" />
				</Grid>
				<Grid size={{ xs: 6, md: 3 }}>
					<StatCard title="Tasa mensual" value="90%" />
				</Grid>
				<Grid size={{ xs: 6, md: 3 }}>
					<StatCard title="Mejor racha" value={`${selectedHabit.streak} días`} />
				</Grid>
			</Grid>

			<Paper sx={{ p: 3, borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
				<Typography variant="h6" fontWeight="bold" mb={3}>
					Vista Mensual: {selectedHabit.name}
				</Typography>
				<Box>
					{selectedHabit._id && (
						<HabitMonthRecords habitId={selectedHabit._id} />
					)}
				</Box>
			</Paper>
		</Box>
	);
};

export default HabitStats;
