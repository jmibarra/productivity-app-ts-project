import { Container, Grid } from "@mui/material";
import { useReducer } from "react";
import { ReducerActionType } from "../../actions/tasks";
import { tasksReducer,initialState } from "../../reducers/tasks";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Task } from "../interfaces/interfaces";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Tasks = () => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    
    const [state, dispatch] = useReducer(tasksReducer,initialState)

    const addTask = (task:Task):void => {
        dispatch({type: ReducerActionType.SET_TASK,payload:task})
    }
    return (
        <Container fixed>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Item><TaskForm addTask={addTask}/></Item>
                </Grid>
                <Grid item xs={4}>
                    <Item><TaskList tasks={state.tasks}/></Item>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Tasks