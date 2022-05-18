
import IconButton from '@mui/material/IconButton';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Divider } from "@mui/material";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { Task } from '../../interfaces/tasks/interfaces';
import { useState } from 'react';
import { alignProperty } from '@mui/material/styles/cssUtils';
import shortid from 'shortid';

interface Props {
    addTask: (task:Task) => void,
}

const TaskQuickInputComponent = ({addTask}:Props) => {

    const [taskTitle, setTaskTitle] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    
    const createNewTask = (taskTile:String):void => {
        const newTask = {
            id: shortid(),
            title: taskTile,
            desc: "",
            completed: false
        } as Task;
        addTask(newTask);
    }

    return (
        <>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Nueva tarea"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={handleChange}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={()=> createNewTask(taskTitle)}>
                    <AddTaskIcon />
                </IconButton>
            </Paper>
        </>
    );
}

export default TaskQuickInputComponent