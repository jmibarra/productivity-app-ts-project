import { useCallback, useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { CircularProgress } from "@mui/material";
import {
	createHabitRecord,
	getHabitRecordsByPeriod,
	updateHabitRecord,
} from "../../../services/habitsServices";
import { HabitRecord } from "../../../interfaces";
import {
	CalendarContainer,
	Day,
	DaysGrid,
	Weekdays,
} from "./styles/HabitMonthRecordsStyles";

interface Props {
	habitId: string;
}

const HabitMonthRecords = ({ habitId }: Props) => {
	const [habitRecords, setHabitRecords] = useState<HabitRecord[]>([]);
	const [loading, setLoading] = useState(false);

	const getDaysInMonth = (year: number, month: number) => {
		return new Date(year, month + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (year: number, month: number) => {
		return new Date(year, month, 1).getDay();
	};

	const getCurrentMonthDays = () => {
		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth();
		const daysInMonth = getDaysInMonth(year, month);
		const firstDay = getFirstDayOfMonth(year, month);
		const offset = firstDay === 0 ? 6 : firstDay - 1; // Ajustar para que lunes sea el primer día

		return Array.from({ length: daysInMonth }).map((_, index) => {
			const date = new Date(year, month, index + 1);
			const formattedDate = date.toISOString().split("T")[0];
			return {
				_id: "",
				habit_id: habitId,
				date: formattedDate,
				progress: { completed: false, amount: 0 },
			};
		});
	};

	const fetchHabitRecordsForMonth = useCallback(async () => {
		setLoading(true);
		try {
			const today = new Date();
			const year = today.getFullYear();
			const month = today.getMonth();
			const startDate = new Date(year, month, 1);
			const endDate = new Date(year, month + 1, 0);

			const initialHabitRecords = getCurrentMonthDays();
			const responseJson = await getHabitRecordsByPeriod(
				habitId,
				startDate.toISOString(),
				endDate.toISOString()
			);

			const recordsMap: { [date: string]: HabitRecord } = {};
			responseJson.forEach((record: HabitRecord) => {
				const recordDate = new Date(record.date)
					.toISOString()
					.split("T")[0];
				recordsMap[recordDate] = record;
			});

			const updatedHabitRecords = initialHabitRecords.map((record) => ({
				...record,
				_id: recordsMap[record.date] ? recordsMap[record.date]._id : "",
				progress: recordsMap[record.date]
					? recordsMap[record.date].progress
					: record.progress,
			}));

			setHabitRecords(updatedHabitRecords);
		} catch (error) {
			console.error("Error fetching habits", error);
		} finally {
			setLoading(false);
		}
	}, [habitId]);

	useEffect(() => {
		fetchHabitRecordsForMonth();
	}, [fetchHabitRecordsForMonth]);

	const weekDays = ["L", "M", "Mi", "J", "V", "S", "D"];

	return (
		<CalendarContainer>
			{loading && <CircularProgress size={20} />}
			{!loading && (
				<>
					<Weekdays>
						{weekDays.map((day) => (
							<div key={day} className="weekday">
								{day}
							</div>
						))}
					</Weekdays>
					<DaysGrid>
						{habitRecords.map((HabitRecord, index) => {
							const dateParts = HabitRecord.date.split("-"); // Divide "YYYY-MM-DD"
							const day = new Date(
								Date.UTC(
									parseInt(dateParts[0]), // Año
									parseInt(dateParts[1]) - 1, // Mes (0-indexado)
									parseInt(dateParts[2]) // Día
								)
							).getUTCDate();
							return (
								<Day
									key={HabitRecord._id + HabitRecord.date}
									className={
										HabitRecord.progress.completed
											? "day checked"
											: "day unchecked"
									}
									onClick={() => {}}
									style={{
										gridColumnStart:
											index === 0
												? getFirstDayOfMonth(
														new Date().getFullYear(),
														new Date().getMonth()
												  )
												: undefined,
									}}
								>
									{HabitRecord.progress.completed ? (
										<CheckIcon fontSize="small" />
									) : (
										day
									)}
								</Day>
							);
						})}
					</DaysGrid>
				</>
			)}
		</CalendarContainer>
	);
};

export default HabitMonthRecords;
