import { Task } from "../interfaces/interfaces"
import List from '@mui/material/List';
import { useState } from "react";
import TaskComponent from "./Task";

interface Props {
    tasks: Task[]
}

const TaskList = ({tasks}:Props) => {
    return (
    <>
         <h2>Tareas</h2>
         <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {tasks.map((task:Task,index) => {
                return (
                    <TaskComponent task={task} index={index} />
                );
            })}
        </List>
    </>
  )
}

export default TaskList