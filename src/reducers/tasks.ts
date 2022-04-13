import { Reducer } from "react";
import { ReducerActionType } from "../actions/tasks";
import { TasksState,Task } from "../tasks/interfaces/interfaces";

export type ReducerAction = {
    type: ReducerActionType;
    payload?: any;
};


export const useTodoReducer: Reducer<TasksState, ReducerAction> = (state, action) => {
    switch(action.type) {
        case ReducerActionType.CREATE_TASK:
            //Aca voy a llamar a al API
            return {
               ...state, 
               tasks: [action.payload,...state.tasks]
            };
        case ReducerActionType.GET_TASK: {
            const selectedTask = state.tasks.find(
                (task) => task.id === action.payload.id
            );
            return {
                ...state,
                selectedTask,
            };
        }
        case ReducerActionType.DELETE_TASK: {
            const deletedTodo = action.payload as Task;
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