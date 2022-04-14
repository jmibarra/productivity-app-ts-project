import { Reducer } from "react";
import { ReducerActionType } from "../actions/tasks";
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
               tasks: [action.payload,...state.tasks]
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
                (task:Task) => task.id !== action.payload.id 
            ) as Task[];
            return{
                ...state,
                tasks: newTasks,
            };
        }
        default:
            return state
    }
 }