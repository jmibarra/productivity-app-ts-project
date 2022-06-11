import { useState } from "react";

import { Task } from "../../interfaces/tasks/interfaces"

import List from '@mui/material/List';


import TaskComponent from "./Task";
import TaskQuickInputComponent from "./TaskQuickInput";
import TaskDetailViewModal from "./modal/TaskDetailViewModal";

interface Props {
    tasks: Task[],
    addTask: (task:Task) => void,
    deleteTask: (id: string) => void,
    toogleTask: (id: string, completed: boolean) => void
    selectedTask?: Task
}

const TaskList = ({tasks,addTask,deleteTask,toogleTask,selectedTask}:Props) => {


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
        <h2>Tareas</h2>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <TaskQuickInputComponent addTask={addTask}/>
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