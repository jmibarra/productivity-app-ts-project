import { Task } from "../../interfaces";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	CompletedText,
	TaskContainer,
	DescriptionText,
} from "./styles/TasksStyles";
import Priority from "../common/Priority/Priority";
import { Box } from "@mui/material";
import DueDateComponent from "../common/DueDate/DueDateComponent";
import HorizontalDivider from "../common/HorizontalDivider";
import EmptyDateComponent from "../common/DueDate/EmptyDateComponent";

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

	return (
		<>
			<TaskContainer>
				<ListItem
					secondaryAction={
						<Box display="flex" alignItems="center" gap={1}>
							{task.dueDate ? (
								<DueDateComponent dueDate={task.dueDate} />
							) : (
								<EmptyDateComponent
									dueDate={task.dueDate}
									updateDueDate={updateDueDate}
									taskId={task._id}
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
							>
								<DeleteIcon />
							</IconButton>
						</Box>
					}
					disablePadding
					alignItems="flex-start"
				>
					<ListItemButton role={undefined} dense>
						<ListItemIcon>
							<Checkbox
								edge="start"
								checked={task.completed}
								tabIndex={-1}
								disableRipple
								inputProps={{ "aria-labelledby": labelId }}
								onClick={handleToggle(task._id, task.completed)}
							/>
						</ListItemIcon>
						<ListItemText
							id={labelId}
							primary={task.title}
							secondary={task.description}
							onClick={() => handleSelectTask(task)}
							primaryTypographyProps={
								task.completed
									? { component: CompletedText }
									: {
											style: {
												fontWeight: "bold",
												color: "#333",
											},
									  }
							}
							secondaryTypographyProps={
								task.completed
									? { component: CompletedText }
									: { component: DescriptionText }
							}
						/>
					</ListItemButton>
				</ListItem>
			</TaskContainer>
		</>
	);
};

export default TaskComponent;
