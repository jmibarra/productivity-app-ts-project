import { Task } from "../../interfaces";

import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Priority from "../common/Priority/Priority";
import { Box, Card, Typography } from "@mui/material";
import DueDateComponent from "../common/DueDate/DueDateComponent";
import HorizontalDivider from "../common/HorizontalDivider";
import EmptyDateComponent from "../common/DueDate/EmptyDateComponent";
import { useEffect, useState } from "react";

interface Props {
	task: Task;
	index: number;
	deleteTask: (id: string) => void;
	toogleTask: (id: string, completed: boolean) => void;
	handleSelectTask: (selectedTask: Task) => void;
	updatePriority: (id: string, newPriority: number) => void;
	updateDueDate: (id: string, dueDate: String) => void;
}

const TaskComponent = ({
	task,
	deleteTask,
	toogleTask,
	handleSelectTask,
	updatePriority,
	updateDueDate,
}: Props) => {
	const labelId = `checkbox-list-label-${task._id}`;

	const handleToggle = (id: string, completed: boolean) => () => {
		toogleTask(id, completed);
	};

	const [currentDueDate, setCurrentDueDate] = useState<string | undefined>(
		task.dueDate
	);

	useEffect(() => {
		setCurrentDueDate(task.dueDate);
	}, [task.dueDate]);

	return (
		<Card
			sx={{
				width: "100%",
				borderRadius: "12px",
				boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
				transition: "all 0.2s ease-in-out",
				"&:hover": {
					transform: "translateY(-2px)",
					boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
				},
			}}
		>
			<Box display="flex" alignItems="center" p={2}>
				<Checkbox
					edge="start"
					checked={task.completed}
					tabIndex={-1}
					disableRipple
					inputProps={{ "aria-labelledby": labelId }}
					onClick={handleToggle(task._id, task.completed)}
					sx={{ mr: 2 }}
				/>
				<Box
					flexGrow={1}
					onClick={() => handleSelectTask(task)}
					sx={{ cursor: "pointer" }}
				>
					<Typography
						variant="subtitle1"
						sx={{
							fontWeight: "bold",
							textDecoration: task.completed ? "line-through" : "none",
							color: task.completed ? "text.disabled" : "text.primary",
						}}
					>
						{task.title}
					</Typography>
					{task.description && (
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{
								textDecoration: task.completed ? "line-through" : "none",
								display: "-webkit-box",
								WebkitLineClamp: 2,
								WebkitBoxOrient: "vertical",
								overflow: "hidden",
							}}
						>
							{task.description}
						</Typography>
					)}
				</Box>

				<Box display="flex" alignItems="center" gap={1} ml={2}>
					{currentDueDate ? (
						<DueDateComponent
							dueDate={currentDueDate}
							updateDueDate={updateDueDate}
							taskId={task._id}
							setCurrentDueDate={setCurrentDueDate}
						/>
					) : (
						<EmptyDateComponent
							updateDueDate={updateDueDate}
							taskId={task._id}
							setCurrentDueDate={setCurrentDueDate}
						/>
					)}
					<HorizontalDivider />
					<Priority
						priority={task.priority}
						taskId={task._id}
						updatePriority={updatePriority}
					/>
					<IconButton
						edge="end"
						aria-label="delete-action"
						onClick={() => deleteTask(task._id)}
						size="small"
					>
						<DeleteIcon fontSize="small" />
					</IconButton>
				</Box>
			</Box>
		</Card>
	);
};

export default TaskComponent;
