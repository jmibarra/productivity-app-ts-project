import { useState } from "react";
import { Task } from "../interfaces/interfaces"
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


interface Props {
    task: Task;
    index: number;
    deleteTask: any; //Ver el tipo para las funciones
    toogleTask: any;
}

const TaskComponent = ({task,index,deleteTask,toogleTask}:Props) => {
    
    
    const labelId = `checkbox-list-label-${task.id}`;
    
    const handleToggle = (id: string) => () => {
        toogleTask(id)
    };

    return (
        <ListItem
            key={task.id}
            secondaryAction={
                <IconButton edge="end" aria-label="delete-action" onClick={() => deleteTask(task.id)}>
                    <DeleteIcon />
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton role={undefined} onClick={handleToggle(task.id)} dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={task.completed}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText id={labelId} primary={task.title} />
            </ListItemButton>
        </ListItem>
    );
}

export default TaskComponent