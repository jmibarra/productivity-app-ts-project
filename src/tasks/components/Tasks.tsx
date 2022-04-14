import { Container, Grid, Paper } from "@mui/material";
import { useEffect, useReducer } from "react";
import { ReducerActionType } from "../../actions/tasks";
import { tasksReducer,initialState } from "../../reducers/tasks";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Task } from "../interfaces/interfaces";
import { styled } from '@mui/material/styles';

const Tasks = () => {
    
    const [state, dispatch] = useReducer(tasksReducer,initialState)

    useEffect(()=> {
        fetchAllTasks()
    },[]);

    async function fetchAllTasks(){
        fetch('https://6253073dc534af46cb92c87a.mockapi.io/productivityapp/todos')
        .then(response => response.json())
        .then(
            
            tasks => {
                console.log(tasks)
                dispatch({type: ReducerActionType.GET_ALL_TASKS,payload:tasks})
            }
        );
    }

    const addTask = (task:Task):void => {
        dispatch({type: ReducerActionType.SET_TASK,payload:task})
    }

    const deleteTask = (id:string):void => {
        dispatch({type: ReducerActionType.DELETE_TASK,payload:id})
    }

    const toogleTask = (id:string):void => {
        dispatch({type: ReducerActionType.COMPLETE_TASK,payload:id})
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));



    return (
        <Container fixed>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Item><TaskList tasks={state.tasks} deleteTask={deleteTask} toogleTask={toogleTask}/></Item>
                </Grid>
                <Grid item xs={4}>
                    <Item><TaskForm addTask={addTask}/></Item>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Tasks