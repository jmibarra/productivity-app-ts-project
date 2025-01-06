import { useState } from "react";
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
import { Task } from "../../../interfaces/interfaces";
import Priority from "../../common/Priority/Priority";

import HorizontalDivider from "../../common/HorizontalDivider";
import DueDateComponent from "../../common/DueDate/DueDateComponent";
import EmptyDateComponent from "../../common/DueDate/EmptyDateComponent";

interface Props {
	handleClose: () => void;
	taskModalOpen: boolean;
	selectedTaskProp: Task;
	updateLabels: (id: string, labels: string[]) => void;
	updatePriority: (id: string, newPriority: number) => void;
	toogleTask: (id: string, completed: boolean) => void;
}

export default function TaskDetailViewModal({
	handleClose,
	taskModalOpen,
	selectedTaskProp,
	updateLabels,
	updatePriority,
	toogleTask,
}: Props) {
	const [localCompleted, setLocalCompleted] = useState(
		selectedTaskProp.completed
	);

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
							{/* Si existe selectedTaskProp muestro el componente sino muestro el componente emptyDate */}
							{selectedTaskProp.dueDate ? (
								<DueDateComponent
									dueDate={selectedTaskProp.dueDate}
								/>
							) : (
								<EmptyDateComponent />
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
					<Grid container spacing={4}>
						<Grid item xs={12} md={8}>
							<Typography
								variant="h6"
								style={{ fontWeight: "bold" }}
							>
								{selectedTaskProp.title}
							</Typography>
						</Grid>
						<Grid item xs={12} md={8}>
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
						<Grid item xs={12} md={4}>
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
				<Button
					onClick={handleClose}
					variant="contained"
					color="secondary"
				>
					Cerrar
				</Button>
			</DialogActions>
		</Dialog>
	);
}
