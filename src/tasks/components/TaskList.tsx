import { Task } from "../interfaces/interfaces"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { useState } from "react";

interface Props {
    tasks: Task[]
  }

const TaskList = ({tasks}:Props) => {
    const [checked, setChecked] = useState([0]);

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
    <>
         <h2>Tareas</h2>
         <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {tasks.map((task:Task,index) => {
            const labelId = `checkbox-list-label-${task.title}`;

            return (
            <ListItem
                key={task.title}
                secondaryAction={
                <IconButton edge="end" aria-label="comments">
                    <CommentIcon />
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
        })}
    </List>
    </>
  )
}

export default TaskList