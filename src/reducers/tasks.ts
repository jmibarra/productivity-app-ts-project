import { Reducer } from "react";
import { ReducerActionType } from "../actions/tasks";
import Tasks from "../tasks/components/Tasks";
import { TasksState,Task } from "../tasks/interfaces/interfaces";

export type ReducerAction = {
    type: ReducerActionType;
    payload?: any;
};

export const initialState:TasksState = {
    tasks: [],
    loading: false
} 

export const tasksReducer: Reducer<TasksState, ReducerAction> = (state = initialState, action) => {
    switch(action.type) {
        case ReducerActionType.SET_TASK:
            //Aca voy a llamar a al API
            return {
               ...state, 
               tasks: [...state.tasks,action.payload]
            };
        case ReducerActionType.GET_TASK: {
            const selectedTask = state.tasks.find(
                (task:Task) => task.id === action.payload.id
            );
            return {
                ...state,
                selectedTask:selectedTask as Task,
            };
        }
        case ReducerActionType.DELETE_TASK: {
            const newTasks = state.tasks.filter(
                (task:Task) => task.id !== action.payload
            ) as Task[];
            return{
                ...state,
                tasks: newTasks,
            };
        }
        case ReducerActionType.COMPLETE_TASK: {

            const clonedTasks = [...state.tasks]
            const selectedTask = state.tasks.find(
                (task:Task) => task.id === action.payload
            );
            
            const newTask = {...selectedTask}

            newTask.completed = !selectedTask?.completed

            const updatedTasks = clonedTasks.map(task => task.id === newTask.id ? newTask : task);

            return {
                ...state, 
                tasks: updatedTasks
             };
        }
        default:
            return state
    }
 }