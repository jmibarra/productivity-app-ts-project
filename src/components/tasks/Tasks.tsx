import { Paper } from "@mui/material";
import { useEffect, useReducer } from "react";
import { ReducerActionType } from "../../actions/tasks";
import { tasksReducer,initialState } from "../../reducers/tasks";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Task } from "../../interfaces/tasks/interfaces";
import { styled } from '@mui/material/styles';
import { properties } from '../../properties';

interface Props {
    toogleModal: () => void
    taskModalOpen:boolean
}

const Tasks = ({toogleModal,taskModalOpen} : Props) => {
    
    const [state, dispatch] = useReducer(tasksReducer,initialState)

    useEffect(()=> {
        fetchAllTasks()
    },[]);

    async function fetchAllTasks(){
        try{
            fetch(properties.api_url+'/todos')
            .then(response => response.json())
            .then(
                tasks => {
                    dispatch({type: ReducerActionType.GET_ALL_TASKS,payload:tasks})
                }
            );
        }catch(response){
            console.log("Error", response);
        }
        
    }

    const addTask = (task:Task):void => {
        dispatch({type: ReducerActionType.SET_TASK,payload:task})
    }

    const deleteTask = (id:string):void => {
        dispatch({type: ReducerActionType.DELETE_TASK,payload:id})
    }

    const toogleTask = (id:string,completed:boolean):void => {
        dispatch({type: ReducerActionType.COMPLETE_TASK,payload:id})
        try{
            const data = { completed: !completed };

            //POST request with body equal on data in JSON format
            fetch(properties.api_url+"/todos/"+id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then((response) => {
                if(!response.ok){
                    dispatch({type: ReducerActionType.COMPLETE_TASK,payload:id})
                }   
            })

        }catch(response){
            console.log("Error", response);
        }
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <>
                
            <Item><TaskList tasks={state.tasks} deleteTask={deleteTask} toogleTask={toogleTask}/></Item>
            <Item><TaskForm addTask={addTask} toogleModal={toogleModal} taskModalOpen={taskModalOpen}/></Item>
        </>
    )
}

export default Tasks