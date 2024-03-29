import { Task } from "../../interfaces/tasks/interfaces"
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider } from "@mui/material";
import {CompletedText} from "./styles/TasksStyles"
import Priority from "../common/Priority/Priority";

interface Props {
    task: Task;
    index: number;
    deleteTask: (id: string) => void;
    toogleTask: (id: string, completed: boolean) => void;
    handleSelectTask: (selectedTask: Task) => void;
    updatePriority: (id: string, newPriority: Number) => void;
}

const TaskComponent = ({task,deleteTask,toogleTask,handleSelectTask,updatePriority}:Props) => {
    
    const labelId = `checkbox-list-label-${task._id}`;
    
    const handleToggle = (id: string, completed: boolean) => () => {
        toogleTask(id,completed)
    }

    return (
        <>
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete-action" onClick={() => deleteTask(task._id)}>
                    <DeleteIcon />
                </IconButton>
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
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={handleToggle(task._id,task.completed)}
                    />
                </ListItemIcon>
                <ListItemText
                    id={labelId} 
                    primary={task.title} 
                    secondary={task.description}
                    onClick={() => handleSelectTask(task)}
                    primaryTypographyProps={task.completed ? { component: CompletedText } : {}}
                    secondaryTypographyProps={task.completed ? { component: CompletedText } : {}}
                />
                <Priority priority={task.priority} taskId={task._id} updatePriority={updatePriority}/>
            </ListItemButton>
        </ListItem>
        <Divider variant="inset" component="li" />
        </>
    );
}

export default TaskComponent;
