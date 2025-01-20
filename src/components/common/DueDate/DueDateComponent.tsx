import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useState } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Popover } from "@mui/material";

// Extender dayjs con los plugins necesarios
dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
	dueDate: string; // Fecha en formato UTC
	updateDueDate: (id: string, dueDate: string) => void;
	taskId: string;
	setCurrentDueDate: (dueDate: string | undefined) => void;
}

const DueDateComponent = ({
	dueDate,
	updateDueDate,
	taskId,
	setCurrentDueDate,
}: Props) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDateChange = (newValue: Dayjs | null) => {
		const isoString = newValue ? newValue.toISOString() : undefined;
		if (isoString) {
			updateDueDate(taskId, isoString); // Llamamos al método con la fecha en formato ISO
			setCurrentDueDate(isoString); // Actualizamos el estado local con la fecha en formato ISO
		}
		handleClose();
	};

	const open = Boolean(anchorEl);
	const id = open ? "date-picker-popover" : undefined;
	// Obtener la fecha local a partir de la fecha UTC
	const localDueDate = dayjs.utc(dueDate).local();

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
		<Box
			style={{
				display: "flex",
				alignItems: "center",
				color,
				fontSize: "small",
			}}
			onClick={handleClick}
		>
			<AccessAlarmIcon fontSize="small" style={{ marginRight: 4 }} />
			{formattedDate}
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
			>
				<Box p={2}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateTimePicker
							label="Seleccionar fecha"
							onChange={handleDateChange}
							onAccept={handleClose}
						/>
					</LocalizationProvider>
				</Box>
			</Popover>
		</Box>
	);
};

export default DueDateComponent;
