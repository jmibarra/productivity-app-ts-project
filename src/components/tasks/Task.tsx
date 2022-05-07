import { Task } from "../../interfaces/tasks/interfaces"
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider } from "@mui/material";


interface Props {
    task: Task;
    index: number;
    deleteTask: any; //Ver el tipo para las funciones
    toogleTask: (id: string, completed: boolean) => void;
}

const TaskComponent = ({task,deleteTask,toogleTask}:Props) => {
    
    const labelId = `checkbox-list-label-${task.id}`;
    
    const handleToggle = (id: string, completed: boolean) => () => {
        toogleTask(id,completed)
    }

    return (
        <>
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete-action" onClick={() => deleteTask(task.id)}>
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
                        onClick={handleToggle(task.id,task.completed)}
                    />
                </ListItemIcon>

                <ListItemText id={labelId} 
                    primary={task.title} 
                    secondary={task.desc}
                />
                {/* {task.labels?.map((label) => {
                    return (
                        <ListItem key={index}>
                        <Chip
                            label={label}
                            onClick={() => handleLabelClick("Test")}
                            onDelete={() =>handleLabelDelete("Test")}
                        />
                        </ListItem>
                    )
                })}; */}
            </ListItemButton>
        </ListItem>
        <Divider variant="inset" component="li" />
        </>
    );
}

export default TaskComponent