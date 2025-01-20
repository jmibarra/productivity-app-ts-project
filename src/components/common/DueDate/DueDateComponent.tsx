import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useEffect, useState } from "react";

// Extender dayjs con los plugins necesarios
dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
	dueDate: string; // Fecha en formato UTC
}

const DueDateComponent = ({ dueDate }: Props) => {
	const [currentDueDate, setCurrentDueDate] = useState<string | undefined>(
		dueDate
	);

	useEffect(() => {
		// Sincronizar el estado interno con la prop cuando esta cambie
		setCurrentDueDate(dueDate);
	}, [dueDate]);
	// Obtener la fecha local a partir de la fecha UTC
	const localDueDate = dayjs.utc(currentDueDate).local();

	// Formatear la fecha en el formato deseado
	const formattedDate = localDueDate.format("DD/MM/YYYY HH:mm:ss");

	// Obtener el estado de la fecha
	const now = dayjs(); // Fecha y hora actual local
	let color = "#B0B0B0"; // Gris claro por defecto

	if (localDueDate.isBefore(now)) {
		// La fecha ya pasó
		color = "#FF0000"; // Rojo
	} else if (localDueDate.diff(now, "minute") <= 60) {
		// Vence en la próxima hora
		color = "#FFC107"; // Amarillo
	}

	return (
		<span
			style={{
				display: "flex",
				alignItems: "center",
				color,
				fontSize: "small",
			}}
		>
			<AccessAlarmIcon fontSize="small" style={{ marginRight: 4 }} />
			{formattedDate}
		</span>
	);
};

export default DueDateComponent;
