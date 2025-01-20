import React, { useEffect, useState } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Popover } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

interface Props {
	updateDueDate: (id: string, dueDate: string) => void;
	taskId: string;
	dueDate: string | undefined;
}

const EmptyDateComponent = ({ updateDueDate, taskId, dueDate }: Props) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [currentDueDate, setCurrentDueDate] = useState<string | undefined>(
		dueDate
	);

	useEffect(() => {
		// Sincronizar el estado interno con la prop cuando esta cambie
		setCurrentDueDate(dueDate);
	}, [dueDate]);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDateChange = (newValue: Dayjs | null) => {
		const isoString = newValue ? newValue.toISOString() : undefined;
		setCurrentDueDate(isoString); // Actualizamos el estado con el tipo correcto
		if (isoString) {
			updateDueDate(taskId, isoString); // Llamamos al método con la fecha en formato ISO
		}
		handleClose();
	};

	const open = Boolean(anchorEl);
	const id = open ? "date-picker-popover" : undefined;

	return (
		<Box
			style={{
				display: "flex",
				alignItems: "center",
				color: "gray",
				fontSize: "small",
				cursor: "pointer",
			}}
			onClick={handleClick}
		>
			<AccessAlarmIcon fontSize="small" style={{ marginRight: 4 }} />
			Sin fecha de vencimiento
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
			>
				<Box p={2}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateTimePicker
							label="Seleccionar fecha"
							value={
								currentDueDate ? dayjs(currentDueDate) : null
							} // Convertimos a Dayjs
							onChange={handleDateChange}
							onAccept={handleClose}
						/>
					</LocalizationProvider>
				</Box>
			</Popover>
		</Box>
	);
};

export default EmptyDateComponent;
