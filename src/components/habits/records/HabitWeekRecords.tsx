import React, { useCallback, useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import Cookies from "js-cookie";
import { getHabitRecordsByPeriod } from "../../../services/habitsServices";
import { CircularProgress } from "@mui/material";
import { HabitStatsContainer } from "../styles/HabitsStyles";

interface Props {
	habitId: string;
}

interface HabitRecord {
	_id: string;
	habit_id: string;
	date: string;
	progress: {
		completed: boolean;
		amount: number;
	};
	notes?: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

const HabitWeekRecords = ({ habitId }: Props) => {
	const [habitRecords, setHabitRecords] = useState<{
		[date: string]: boolean;
	}>({});
	const [loading, setLoading] = useState(false);

	/** Obtener registros de hábitos */
	const fetchHabitRecordsForWeek = useCallback(
		async (sessionToken: string) => {
			setLoading(true);
			try {
				const today = new Date();
				const startDate = new Date();
				startDate.setDate(today.getDate() - 6); // Hace 6 días hasta hoy
				startDate.setHours(0, 0, 0, 0);

				const endDate = new Date();
				endDate.setHours(23, 59, 59, 999);

				const responseJson: HabitRecord[] =
					await getHabitRecordsByPeriod(
						habitId,
						startDate.toISOString(),
						endDate.toISOString(),
						sessionToken
					);

				// Crear un mapa fecha -> estado de completado
				const recordsMap: { [date: string]: boolean } = {};
				responseJson.forEach((record) => {
					const recordDate = new Date(record.date)
						.toISOString()
						.split("T")[0]; // YYYY-MM-DD
					recordsMap[recordDate] = record.progress.completed;
				});

				setHabitRecords(recordsMap);
			} catch (error) {
				console.error("Error fetching habits", error);
			} finally {
				setLoading(false);
			}
		},
		[habitId]
	);

	/** Cargar el token y llamar a la API */
	useEffect(() => {
		const token = Cookies.get("PROD-APP-AUTH");
		if (token) fetchHabitRecordsForWeek(token);
	}, [fetchHabitRecordsForWeek]);

	/** Obtener los últimos 7 días */
	const last7Days = Array.from({ length: 7 }).map((_, index) => {
		const date = new Date();
		date.setDate(date.getDate() - (6 - index)); // Hace 6 días hasta hoy
		const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
		return { date: formattedDate, day: date.getDate() };
	});

	return (
		<>
			{loading && <CircularProgress size={20} />}
			{last7Days.map(({ date, day }) => {
				const completed = habitRecords[date] ?? false;
				return (
					<div
						key={date}
						className={completed ? "checked" : "unchecked"}
					>
						{completed ? <CheckIcon fontSize="small" /> : day}
					</div>
				);
			})}
		</>
	);
};

export default HabitWeekRecords;
