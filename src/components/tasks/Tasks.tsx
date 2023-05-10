import { useCallback, useEffect, useReducer, useState } from "react";
import { ReducerActionType } from "../../actions/tasks";
import { tasksReducer,initialState } from "../../reducers/tasks";
import { Task } from "../../interfaces/tasks/interfaces";
import { properties } from '../../properties';
import TaskForm from "./taskForm/TaskForm";
import TaskList from "./TaskList";
import Pagination from '@mui/material/Pagination';

import {Item, ItemFooter, ItemHeader,ListFooterBox} from "./styles/TasksStyles"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TaskQuickInputComponent from "./TaskQuickInput";
import Cookies from "js-cookie";

interface HeadersInit {
    headers: Headers;
    credentials: RequestCredentials;
}

const Tasks = () => {
    
    const [state, dispatch] = useReducer(tasksReducer,initialState)
    const [taskFormModalOpen, settaskFormModalOpen] = useState(false)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)
    const [sessionToken, setSessionToken] = useState<string | null>(null);


    const fabStyle = {
        position: 'absolute',
        bottom: 16,
        right: 16,
      };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const fetchAllTasks = useCallback(async (page:number,limit:number) => {
        try{

            const headers = new Headers() as HeadersInit["headers"];
            headers.append("Cookie", `PROD-APP-AUTH=${sessionToken}`);

            fetch(
                properties.api_url+'/tasks?page='+page+'&limit='+limit
                ,
                {
                    headers,
                    credentials: "include",
                }
            ).then(
                response => response.json()
            ).then(
                responseJson => {
                    dispatch({type: ReducerActionType.GET_ALL_TASKS,payload:responseJson.tasks})
                    if(responseJson.count > 0){
                        setTotalPages(Math.trunc(responseJson.count/limit)+1)
                    }
                    
                }
            );
        }catch(response){
            console.log("Error", response);
        }
        
    },[sessionToken]);

    const addTask = async (task:Task): Promise<void> => {
        try{
            const headers = new Headers() as HeadersInit["headers"];
            headers.append("Cookie", `PROD-APP-AUTH=${sessionToken}`);
            headers.append('Content-Type', 'application/json');

            const response = await fetch(properties.api_url+"/tasks", {
                method: 'POST',
                headers,
                credentials: 'include',
                body: JSON.stringify(task),
            })

            if (!response.ok) {
                console.log("Error", response);
                return;
            }

            const responseJson = await response.json();
            const createdTask: Task = responseJson;

            dispatch({type: ReducerActionType.SET_TASK,payload:createdTask})

        }catch(response){
            console.log("Error", response);
        }
    }

    const deleteTask = (id:string):void => {
        try{
            const headers = new Headers() as HeadersInit["headers"];
            headers.append("Cookie", `PROD-APP-AUTH=${sessionToken}`);
            headers.append('Content-Type', 'application/json');

            fetch(properties.api_url+"/tasks/"+id, {
                method: 'DELETE',
                headers,
                credentials: 'include'
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
         
        try{
            const headers = new Headers() as HeadersInit["headers"];
            headers.append("Cookie", `PROD-APP-AUTH=${sessionToken}`);
            headers.append('Content-Type', 'application/json');

            dispatch({type: ReducerActionType.COMPLETE_TASK,payload:id})

            const data = { completed: !completed };
            
            fetch(properties.api_url+"/tasks/"+id, {
                method: 'PATCH',
                headers,
                credentials: 'include',
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

    const updateLabels = (id:string, labels: string[]):void => {
        try{

            const headers = new Headers() as HeadersInit["headers"];
            headers.append("Cookie", `PROD-APP-AUTH=${sessionToken}`);
            headers.append('Content-Type', 'application/json');

            const data = { labels: labels };
            fetch(properties.api_url+"/tasks/"+id, {
                method: 'PATCH',
                headers,
                credentials: 'include',
                body: JSON.stringify(data),
            })
            .then((response) => {
                if(response.ok){
                    dispatch({type: ReducerActionType.MODIFI_TASK_LABELS,payload:{labels:labels,id:id}})
                }   
            })

        }catch(response){
            console.log("Error", response);
        }
    }

    useEffect(() => {
        const token = Cookies.get('PROD-APP-AUTH');
        
        if(token)
            setSessionToken(token);    
        
        fetchAllTasks(page, 10);
        
    }, [fetchAllTasks,page]);

    const handleCloseModal = () => {
        settaskFormModalOpen(false)
    }

    return (
        <>   
            <ItemHeader><h1>Tareas</h1></ItemHeader>
            <Item>
                <TaskQuickInputComponent addTask={addTask}/>
                <TaskList tasks={state.tasks} deleteTask={deleteTask} toogleTask={toogleTask} updateLabels={updateLabels}/>
            </Item>
            <ItemFooter>
                <ListFooterBox>
                    <Pagination count={totalPages} page={page} onChange={handlePageChange} variant="outlined" color="primary" />
                </ListFooterBox>
            </ItemFooter>
            <Fab sx={fabStyle} color="primary" aria-label="add" onClick={ () => settaskFormModalOpen(true)}>
                <AddIcon/>
            </Fab>
            <TaskForm addTask={addTask} handleCloseModal={handleCloseModal} taskModalOpen={taskFormModalOpen}/>
        </>
    )
}

export default Tasks