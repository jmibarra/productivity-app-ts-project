import { useEffect, useReducer, useState } from "react";
import { ReducerActionType } from "../../actions/tasks";
import { tasksReducer,initialState } from "../../reducers/tasks";
import { Task } from "../../interfaces/tasks/interfaces";
import { properties } from '../../properties';
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import Pagination from '@mui/material/Pagination';

import Stack from '@mui/material/Stack';

import { styled } from '@mui/material/styles';
import { Paper } from "@mui/material";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const Tasks = () => {
    
    const [state, dispatch] = useReducer(tasksReducer,initialState)
    const [taskFormModalOpen, settaskFormModalOpen] = useState(false)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)

    useEffect(()=> {
        fetchAllTasks(page,10)
    },[page]);

    const handleCloseModal = () => {
        settaskFormModalOpen(false)
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    async function fetchAllTasks(page:number,limit:number){
        try{
            fetch(properties.api_url+'/todos?page='+page+'&limit='+limit)
            .then(
                response => response.json()
            )
            .then(
                responseJson => {
                    dispatch({type: ReducerActionType.GET_ALL_TASKS,payload:responseJson.items})
                    if(responseJson.count > 0){
                        setTotalPages(Math.trunc(responseJson.count/10)+1)
                    }
                    
                }
            );
        }catch(response){
            console.log("Error", response);
        }
        
    }

    const addTask = (task:Task):void => {
        try{
            fetch(properties.api_url+"/todos/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            })
            .then((response) => {
                if(!response.ok){
                    console.log("Error", response);
                }else
                    dispatch({type: ReducerActionType.SET_TASK,payload:task})
            })

        }catch(response){
            console.log("Error", response);
        }
    }

    const deleteTask = (id:string):void => {
        try{
            fetch(properties.api_url+"/todos/"+id, {
                method: 'DELETE',
            })
            .then((response) => {
                if(!response.ok){
                    console.log("Error", response);
                }else{
                    dispatch({type: ReducerActionType.DELETE_TASK,payload:id})
                }
            })

        }catch(response){
            console.log("Error", response);
        }
    }

    const toogleTask = (id:string,completed:boolean):void => {
        dispatch({type: ReducerActionType.COMPLETE_TASK,payload:id})
        try{
            const data = { completed: !completed };
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
                    console.log("Error", response);
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
        marginTop: '20px'
    }));

    return (
        <>   
            <Item>
                <TaskList 
                    tasks={state.tasks} 
                    addTask={addTask}
                    deleteTask={deleteTask} 
                    toogleTask={toogleTask}
                    selectedTask={state.selectedTask}
                />
                
                <Box sx={{ '& > :not(style)': { m: 1 } }} display="flex" justifyContent="center" alignItems="center">
                    <Pagination count={totalPages} page={page} onChange={handlePageChange} variant="outlined" color="primary" />
                </Box>
                <Box sx={{ '& > :not(style)': { m: 1 } }} display="flex" justifyContent="center" alignItems="center">
                    <Fab color="primary" aria-label="add">
                        <AddIcon onClick={ () => settaskFormModalOpen(true)}/>
                    </Fab>
                </Box>
                <TaskForm addTask={addTask} handleCloseModal={handleCloseModal} taskModalOpen={taskFormModalOpen}/>
            </Item>
        </>
    )
}

export default Tasks