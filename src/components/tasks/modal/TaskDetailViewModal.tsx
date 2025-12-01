import { useEffect, useState } from "react";
import {
	Box,
	Checkbox,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StatusChipComponent from "../../common/StatusChipComponent";
import LabelsComponent from "../../common/Labels/LabelsComponent";
import Priority from "../../common/Priority/Priority";

import DueDateComponent from "../../common/DueDate/DueDateComponent";
import EmptyDateComponent from "../../common/DueDate/EmptyDateComponent";
import { Task } from "../../../interfaces";
import TaskListSelectComponent from "../../common/TaskLists/TaskListSelectComponent";

interface Props {
	handleClose: () => void;
	taskModalOpen: boolean;
	selectedTaskProp: Task;
	updateLabels: (id: string, labels: string[]) => void;
	updatePriority: (id: string, newPriority: number) => void;
	toogleTask: (id: string, completed: boolean) => void;
	updateDueDate: (id: string, dueDate: String) => void;
}

export default function TaskDetailViewModal({
	handleClose,
	taskModalOpen,
	selectedTaskProp,
	updateLabels,
	updatePriority,
	toogleTask,
	updateDueDate,
}: Props) {
	const [localCompleted, setLocalCompleted] = useState(
		selectedTaskProp.completed
	);

	const [currentDueDate, setCurrentDueDate] = useState<string | undefined>(
		selectedTaskProp.dueDate
	);

	useEffect(() => {
		setCurrentDueDate(selectedTaskProp.dueDate);
	}, [selectedTaskProp.dueDate]);

	const handleToggle = (id: string, completed: boolean) => () => {
		setLocalCompleted(!localCompleted);
		toogleTask(id, completed);
	};

	return (
		<Dialog
			open={taskModalOpen}
			onClose={handleClose}
			aria-labelledby="task-detail-title"
			fullWidth
			maxWidth="md"
			PaperProps={{
				sx: { borderRadius: "16px", p: 1 },
			}}
		>
			<DialogTitle
				id="task-detail-title"
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-start",
					pb: 0,
				}}
			>
				<Box display="flex" alignItems="center" gap={2} width="100%">
					<Checkbox
						checked={localCompleted}
						onChange={handleToggle(selectedTaskProp._id, selectedTaskProp.completed)}
						color="primary"
						sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
					/>
					<Typography variant="h5" fontWeight="bold" style={{ textDecoration: localCompleted ? "line-through" : "none", color: localCompleted ? "text.disabled" : "text.primary" }}>
						{selectedTaskProp.title}
					</Typography>
				</Box>
				<IconButton onClick={handleClose} size="small">
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ pt: 3 }}>
				<Grid container spacing={4}>
					{/* Main Content */}
					<Grid size={{ xs: 12, md: 8 }}>
						<Box mb={3}>
							<Typography variant="subtitle2" color="text.secondary" fontWeight="bold" gutterBottom>
								Descripción
							</Typography>
							<Typography variant="body1" style={{ whiteSpace: "pre-line", minHeight: "100px", color: selectedTaskProp.description ? "inherit" : "gray" }}>
								{selectedTaskProp.description || "Añade una descripción más detallada..."}
							</Typography>
						</Box>
					</Grid>

					{/* Sidebar Metadata */}
					<Grid size={{ xs: 12, md: 4 }}>
						<Stack spacing={3}>
							<Box>
								<Typography variant="subtitle2" color="text.secondary" fontWeight="bold" gutterBottom>
									Estado
								</Typography>
								<StatusChipComponent completed={selectedTaskProp.completed} />
							</Box>

							<Box>
								<Typography variant="subtitle2" color="text.secondary" fontWeight="bold" gutterBottom>
									Prioridad
								</Typography>
								<Box display="flex" alignItems="center">
									<Priority
										priority={selectedTaskProp.priority}
										taskId={selectedTaskProp._id}
										updatePriority={updatePriority}
									/>
								</Box>
							</Box>

							<Box>
								<Typography variant="subtitle2" color="text.secondary" fontWeight="bold" gutterBottom>
									Fecha de Vencimiento
								</Typography>
								{currentDueDate ? (
									<DueDateComponent
										dueDate={currentDueDate}
										updateDueDate={updateDueDate}
										taskId={selectedTaskProp._id}
										setCurrentDueDate={setCurrentDueDate}
									/>
								) : (
									<EmptyDateComponent
										updateDueDate={updateDueDate}
										taskId={selectedTaskProp._id}
										setCurrentDueDate={setCurrentDueDate}
									/>
								)}
							</Box>

							<Box>
								<Typography variant="subtitle2" color="text.secondary" fontWeight="bold" gutterBottom>
									Lista
								</Typography>
								<TaskListSelectComponent task={selectedTaskProp} />
							</Box>

							<Box>
								<Typography variant="subtitle2" color="text.secondary" fontWeight="bold" gutterBottom>
									Etiquetas
								</Typography>
								<LabelsComponent
									labels={selectedTaskProp.labels ?? []}
									taskId={selectedTaskProp._id}
									updateLabels={updateLabels}
								/>
							</Box>
						</Stack>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
}
