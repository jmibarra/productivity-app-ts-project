import { useState } from "react";

import { Task } from "../../interfaces/tasks/interfaces"

import TaskComponent from "./Task";
import TaskDetailViewModal from "./modal/TaskDetailViewModal";

import List from '@mui/material/List';

interface Props {
    tasks: Task[],
    deleteTask: (id: string) => void,
    toogleTask: (id: string, completed: boolean) => void
}

const TaskList = ({tasks,deleteTask,toogleTask}:Props) => {


    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState("")

    const handleCloseModal = () => {
        setTaskModalOpen(false)
    }

    const handleSelectTask = (id:string) => {
        setSelectedTaskId(id)
        setTaskModalOpen(true)
    }

    return (
    <>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {tasks.map((task:Task,index) => {
                return (
                    <TaskComponent task={task} index={index} deleteTask={deleteTask} toogleTask={toogleTask} handleSelectTask={handleSelectTask} key={task.id}/>
                );
            })}
        </List>
        <TaskDetailViewModal handleClose={handleCloseModal} taskModalOpen={taskModalOpen} selectedTaskId={selectedTaskId} />
    </>
  )
}

export default TaskList