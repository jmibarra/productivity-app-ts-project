import { useCallback, useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import {
	createHabitRecord,
	getHabitRecordsByPeriod,
	updateHabitRecord,
} from "../../../services/habitsServices";
import { CircularProgress } from "@mui/material";
import { HabitRecord } from "../../../interfaces";

interface Props {
	habitId: string;
}

const HabitMonthRecords = ({ habitId }: Props) => {
	const [habitRecords, setHabitRecords] = useState<HabitRecord[]>([]);
	const [loading, setLoading] = useState(false);

	const getLast7Days = () => {
		return Array.from({ length: 30 }).map((_, index) => {
			//timezone en UTC
			const date = new Date();
			date.setDate(date.getDate() - (6 - index)); // Hace 6 días hasta hoy
			const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
			return {
				_id: "",
				habit_id: habitId,
				date: formattedDate,
				progress: { completed: false, amount: 0 },
			};
		});
	};

	/** Obtener registros de hábitos */
	const fetchHabitRecordsForWeek = useCallback(async () => {
		setLoading(true);
		try {
			const today = new Date();
			const startDate = new Date();
			startDate.setDate(today.getDate() - 6); // Hace 6 días hasta hoy
			startDate.setHours(0, 0, 0, 0);

			const endDate = new Date();
			endDate.setHours(23, 59, 59, 999);

			const initialHabitRecords = getLast7Days();

			const responseJson = await getHabitRecordsByPeriod(
				habitId,
				startDate.toISOString(),
				endDate.toISOString()
			);
			// Crear un mapa fecha -> estado de completado
			const recordsMap: { [date: string]: HabitRecord } = {};
			responseJson.forEach((record: HabitRecord) => {
				const recordDate = new Date(record.date)
					.toISOString()
					.split("T")[0];
				recordsMap[recordDate] = record;
			});

			const updatedHabitRecords = initialHabitRecords.map((record) => {
				const recordDate = record.date;
				return {
					...record,
					_id: recordsMap[recordDate]
						? recordsMap[recordDate]._id
						: "",
					progress: recordsMap[recordDate]
						? recordsMap[recordDate].progress
						: record.progress,
				};
			});
			setHabitRecords(updatedHabitRecords);
			console.log(updatedHabitRecords);
		} catch (error) {
			console.error("Error fetching habits", error);
		} finally {
			setLoading(false);
		}
	}, [habitId]);

	const handleRecordClick = async (record: HabitRecord) => {
		try {
			// Crear una copia del registro con el progreso actualizado
			const updatedRecordData = {
				...record,
				progress: {
					...record.progress,
					completed: !record.progress.completed,
				},
			};

			// Actualiza el estado de inmediato para una mejor UX
			setHabitRecords((prevRecords) =>
				prevRecords.map((prevRecord) =>
					prevRecord.date === updatedRecordData.date
						? updatedRecordData
						: prevRecord
				)
			);

			// Decide si crear o actualizar en la API
			const updatedRecord = record._id
				? await updateHabitRecord(updatedRecordData)
				: await createHabitRecord(updatedRecordData);

			// Sincroniza el estado con la respuesta del backend (por si hay cambios en la API)
			setHabitRecords((prevRecords) =>
				prevRecords.map((prevRecord) =>
					prevRecord.date === updatedRecord.date
						? updatedRecord
						: prevRecord
				)
			);
		} catch (error) {
			console.error("Error updating habit record:", error);
		}
	};

	useEffect(() => {
		fetchHabitRecordsForWeek();
	}, [fetchHabitRecordsForWeek]);

	return (
		<>
			{loading && <CircularProgress size={20} />}
			{!loading &&
				habitRecords.map((HabitRecord) => {
					const dateParts = HabitRecord.date.split("-"); // Divide "YYYY-MM-DD"
					const day = new Date(
						Date.UTC(
							parseInt(dateParts[0]), // Año
							parseInt(dateParts[1]) - 1, // Mes (0-indexado)
							parseInt(dateParts[2]) // Día
						)
					).getUTCDate();
					return (
						<div
							key={HabitRecord._id + HabitRecord.date}
							className={
								HabitRecord.progress.completed
									? "day checked"
									: "day unchecked"
							}
							onClick={() => handleRecordClick(HabitRecord)}
						>
							{HabitRecord.progress.completed ? (
								<CheckIcon fontSize="small" />
							) : (
								day
							)}
						</div>
					);
				})}
		</>
	);
};

export default HabitMonthRecords;
