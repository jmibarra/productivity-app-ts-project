import { Task } from "../interfaces/interfaces"
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

interface Props {
    task: Task;
    index: number;
}

const TaskComponent = ({task,index}:Props) => {
    const [checked, setChecked] = useState([0]);
    const labelId = `checkbox-list-label-${task.id}`;
    
    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <ListItem
            key={task.id}
            secondaryAction={
                <IconButton edge="end" aria-label="delete-action">
                    <DeleteIcon />
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={checked.indexOf(index) !== -1}
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