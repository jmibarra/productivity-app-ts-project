import { useEffect, useRef, useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	CircularProgress,
	Grid,
	Typography,
} from "@mui/material";
import { Item, ItemLarge } from "./styles/TaskDetailViewModalStyles";
import StatusChipComponent from "../../common/StatusChipComponent";
import LabelsComponent from "../../common/Labels/LabelsComponent";
import { Task } from "../../../interfaces/tasks/interfaces";
import Priority from "../../common/Priority/Priority";

interface Props {
	handleClose: () => void;
	taskModalOpen: boolean;
	selectedTaskProp: Task | undefined;
	updateLabels: (id: string, labels: string[]) => void;
	updatePriority: (id: string, newPriority: number) => void;
}

export default function TaskDetailViewModal({
	handleClose,
	taskModalOpen,
	selectedTaskProp,
	updateLabels,
	updatePriority,
}: Props) {
	const [selectedTask, setSelectedTask] = useState<Task>();
	const [loading, setLoading] = useState(true);
	const descriptionElementRef = useRef<HTMLElement>(null);

	useEffect(() => {
		setSelectedTask(selectedTaskProp);
		setLoading(false);
	}, [selectedTaskProp]);

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
				{selectedTask && (
					<>
						<Typography variant="h6" style={{ fontWeight: "bold" }}>
							{selectedTask.title}
						</Typography>
						<Priority
							priority={selectedTask.priority}
							taskId={selectedTask._id}
							updatePriority={updatePriority}
						/>
					</>
				)}
			</DialogTitle>
			<DialogContent dividers>
				{loading ? (
					<CircularProgress />
				) : (
					selectedTask && (
						<Grid container spacing={4}>
							<Grid item xs={12} md={8}>
								<ItemLarge>
									<Typography
										variant="body1"
										style={{ whiteSpace: "pre-line" }}
									>
										{selectedTask.description ||
											"Sin descripción"}
									</Typography>
								</ItemLarge>
							</Grid>
							<Grid item xs={12} md={4}>
								<Item>
									<StatusChipComponent
										completed={selectedTask.completed}
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
										labels={selectedTask.labels ?? []}
										taskId={selectedTask._id}
										updateLabels={updateLabels}
									/>
								</Item>
							</Grid>
						</Grid>
					)
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
