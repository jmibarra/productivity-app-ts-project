import { useCallback, useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import Cookies from "js-cookie";
import { getHabitRecordsByPeriod } from "../../../services/habitsServices";
import { CircularProgress } from "@mui/material";

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
}

const HabitWeekRecords = ({ habitId }: Props) => {
	const [habitRecords, setHabitRecords] = useState<HabitRecord[]>([]);
	const [loading, setLoading] = useState(false);

	/** Obtener los últimos 7 días con valores predeterminados */
	const getLast7Days = () => {
		return Array.from({ length: 7 }).map((_, index) => {
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

				const initialHabitRecords = getLast7Days();

				const responseJson = await getHabitRecordsByPeriod(
					habitId,
					startDate.toISOString(),
					endDate.toISOString(),
					sessionToken
				);

				// Crear un mapa fecha -> estado de completado
				const recordsMap: { [date: string]: HabitRecord } = {};
				responseJson.forEach((record: HabitRecord) => {
					const recordDate = new Date(record.date)
						.toISOString()
						.split("T")[0];
					recordsMap[recordDate] = record;
				});

				const updatedHabitRecords = initialHabitRecords.map(
					(record) => {
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
					}
				);
				console.log(updatedHabitRecords);
				setHabitRecords(updatedHabitRecords);
			} catch (error) {
				console.error("Error fetching habits", error);
			} finally {
				setLoading(false);
			}
		},
		[habitId]
	);

	const handleRecordClick = (record: HabitRecord) => {
		if (record._id === "") {
			console.log(
				"El registro no tiene ID por lo que no existe y lo voy a crear"
			);
			return;
		} else {
			console.log("El registro ya existe y lo voy a actualizar");
		}
	};

	useEffect(() => {
		const token = Cookies.get("PROD-APP-AUTH");
		if (token) fetchHabitRecordsForWeek(token);
	}, [fetchHabitRecordsForWeek]);

	return (
		<>
			{loading && <CircularProgress size={20} />}
			{!loading &&
				habitRecords.map((HabitRecord) => {
					const day = new Date(HabitRecord.date).getDate();
					return (
						<div
							key={HabitRecord._id}
							className={
								HabitRecord.progress.completed
									? "checked"
									: "unchecked"
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

export default HabitWeekRecords;
