import { useState } from "react";

import { Task } from "../../interfaces/interfaces";

import TaskComponent from "./Task";
import TaskDetailViewModal from "./modal/TaskDetailViewModal";

import List from "@mui/material/List";

interface Props {
	tasks: Task[];
	deleteTask: (id: string) => void;
	toogleTask: (id: string, completed: boolean) => void;
	updateLabels: (id: string, labels: string[]) => void;
	updatePriority: (id: string, newPriority: number) => void;
}

const TaskList = ({
	tasks,
	deleteTask,
	toogleTask,
	updateLabels,
	updatePriority,
}: Props) => {
	const [taskModalOpen, setTaskModalOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task>();

	const handleCloseModal = () => {
		setTaskModalOpen(false);
	};

	const handleSelectTask = (selectedTask: Task) => {
		setSelectedTask(selectedTask);
		setTaskModalOpen(true);
	};

	return (
		<>
			<List sx={{ width: "100%", bgcolor: "background.paper" }}>
				{tasks.map((task: Task, index) => {
					return (
						<TaskComponent
							task={task}
							index={index}
							deleteTask={deleteTask}
							toogleTask={toogleTask}
							handleSelectTask={handleSelectTask}
							key={task._id}
							updatePriority={updatePriority}
						/>
					);
				})}
			</List>
			{selectedTask && (
				<TaskDetailViewModal
					handleClose={handleCloseModal}
					taskModalOpen={taskModalOpen}
					selectedTaskProp={selectedTask}
					updateLabels={updateLabels}
					updatePriority={updatePriority}
					toogleTask={toogleTask}
				/>
			)}
		</>
	);
};

export default TaskList;
