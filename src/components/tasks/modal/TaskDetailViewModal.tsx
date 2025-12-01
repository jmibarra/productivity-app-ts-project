import { useEffect, useState } from "react";
import {
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	Typography,
} from "@mui/material";
import { Item, ItemLarge } from "./styles/TaskDetailViewModalStyles";
import StatusChipComponent from "../../common/StatusChipComponent";
import LabelsComponent from "../../common/Labels/LabelsComponent";
import Priority from "../../common/Priority/Priority";

import HorizontalDivider from "../../common/HorizontalDivider";
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
		>
			<DialogTitle
				id="task-detail-title"
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				{selectedTaskProp && (
					<>
						<Box display="flex" alignItems="center">
							<Checkbox
								edge="start"
								checked={localCompleted}
								tabIndex={-1}
								disableRipple
								onClick={handleToggle(
									selectedTaskProp._id,
									selectedTaskProp.completed
								)}
							/>
							<HorizontalDivider />
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
						<Priority
							priority={selectedTaskProp.priority}
							taskId={selectedTaskProp._id}
							updatePriority={updatePriority}
						/>
					</>
				)}
			</DialogTitle>
			<DialogContent dividers>
				{selectedTaskProp && (
					<Grid spacing={4}>
						<Grid size={{ xs: 12, md: 8 }}>
							<Typography
								variant="h6"
								style={{ fontWeight: "bold" }}
							>
								{selectedTaskProp.title}
							</Typography>
						</Grid>
						<Grid size={{ xs: 12, md: 8 }}>
							<ItemLarge>
								<Typography
									variant="body1"
									style={{ whiteSpace: "pre-line" }}
								>
									{selectedTaskProp.description ||
										"Sin descripción"}
								</Typography>
							</ItemLarge>
						</Grid>
						<Grid size={{ xs: 12, md: 4 }}>
							<Item>
								<StatusChipComponent
									completed={selectedTaskProp.completed}
								/>
							</Item>
							<Item>
								<Typography
									variant="subtitle1"
									style={{
										fontWeight: "bold",
										marginBottom: 8,
									}}
								>
									Etiquetas
								</Typography>
								<LabelsComponent
									labels={selectedTaskProp.labels ?? []}
									taskId={selectedTaskProp._id}
									updateLabels={updateLabels}
								/>
							</Item>
						</Grid>
					</Grid>
				)}
			</DialogContent>
			<DialogActions>
				<Box display="flex" justifyContent="space-between" width="100%">
					<TaskListSelectComponent task={selectedTaskProp} />
					<Button onClick={handleClose} color="secondary">
						Cerrar
					</Button>
				</Box>
			</DialogActions>
		</Dialog>
	);
}
