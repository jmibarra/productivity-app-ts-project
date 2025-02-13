import React, { useCallback, useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import { getHabitRecordsByPeriod } from "../../../services/habitsServices";

interface props {
	habitId: string;
}
const HabitWeekRecords = ({ habitId }: props) => {
	const [sessionToken, setSessionToken] = useState<string | null>(null);
	const [habitRecords, setHabitRecords] = React.useState([]);
	const [loading, setLoading] = useState(false);

	const fetchHabitRecordsForWeek = useCallback(async () => {
		setLoading(true);
		try {
			let startDate = new Date();
			startDate.setDate(startDate.getDate() - 7);
			startDate.setHours(0, 0, 0, 0);
			let endDate = new Date();
			endDate.setDate(endDate.getDate() - 1);
			endDate.setHours(23, 59, 59, 999);
			const responseJson = await getHabitRecordsByPeriod(
				habitId,
				startDate.toISOString(),
				endDate.toISOString(),
				sessionToken
			);

			setHabitRecords(responseJson);
		} catch (error) {
			console.error("Error fetching habits", error);
		} finally {
			setLoading(false);
		}
	}, [sessionToken, habitId]);

	useEffect(() => {
		const token = Cookies.get("PROD-APP-AUTH");
		if (token) {
			setSessionToken(token);
			fetchHabitRecordsForWeek();
		}
	}, [fetchHabitRecordsForWeek]);

	return (
		<>
			<span>Registros de la semana</span>

			{habitRecords.map((record: any) => (
				<div
					key={record._id}
					className={
						record.progress.completed ? "checked" : "unchecked"
					}
				>
					{record.progress.completed ? (
						<CheckIcon fontSize="small" color="inherit" />
					) : (
						<CloseIcon fontSize="small" color="inherit" />
					)}
				</div>
			))}
		</>
	);
};

export default HabitWeekRecords;
