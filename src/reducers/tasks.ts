import { Reducer } from "react";
import { ReducerActionType } from "../actions/tasks"
import { Task, TasksState } from "../interfaces";


export type ReducerAction = {
    type: ReducerActionType;
    payload?: any;
};

export const initialState:TasksState = {
    tasks: [],
    loading: false,
}

export const tasksReducer: Reducer<TasksState, ReducerAction> = (state = initialState, action) => {
    switch(action.type) {
        case ReducerActionType.SET_TASK:
            return {
               ...state, 
               tasks: [action.payload,...state.tasks,]
            };
        case ReducerActionType.GET_ALL_TASKS:
            return {
                ...state, 
                tasks: action.payload
            };
        case ReducerActionType.GET_TASK: {
            const selectedTask = state.tasks.find(
                (task:Task) => task._id === action.payload.id
            );

            return {
                ...state,
                selectedTask:selectedTask as Task,
            };
        }
        case ReducerActionType.DELETE_TASK: {
            const newTasks = state.tasks.filter(
                (task:Task) => task._id !== action.payload
            ) as Task[];
            return{
                ...state,
                tasks: newTasks,
            };
        }
        case ReducerActionType.COMPLETE_TASK: {

            const clonedTasks = [...state.tasks]
            const selectedTask = state.tasks.find(
                (task:Task) => task._id === action.payload
            );
            
            const newTask = {...selectedTask}

            newTask.completed = !selectedTask?.completed

            const updatedTasks = clonedTasks.map(task => task._id === newTask._id ? newTask : task);

            return {
                ...state, 
                tasks: updatedTasks
             };
        }
        case ReducerActionType.UPDATE_TASK_LABELS: {

            const clonedTasks = [...state.tasks]
            const selectedTask = state.tasks.find(
                (task:Task) => task._id === action.payload.id
            );
            
            const newTask = {...selectedTask}

            newTask.labels = action.payload.labels

            const updatedTasks = clonedTasks.map(task => task._id === newTask._id ? newTask : task);

            return {
                ...state, 
                tasks: updatedTasks
             };
        }
        case ReducerActionType.UPDATE_TASK_PRIORITY: {

            const clonedTasks = [...state.tasks]
            const selectedTask = state.tasks.find(
                (task:Task) => task._id === action.payload.id
            );
            
            const newTask = {...selectedTask}

            newTask.priority = action.payload.priority

            const updatedTasks = clonedTasks.map(task => task._id === newTask._id ? newTask : task);

            return {
                ...state, 
                tasks: updatedTasks
             };
        }
        case ReducerActionType.UPDATE_TASK_DUE_DATE: {

            const clonedTasks = [...state.tasks]
            const selectedTask = state.tasks.find(
                (task:Task) => task._id === action.payload.id
            );
            
            const newTask = {...selectedTask}

            newTask.dueDate = action.payload.dueDate

            const updatedTasks = clonedTasks.map(task => task._id === newTask._id ? newTask : task);

            return {
                ...state, 
                tasks: updatedTasks
             };
        }
        default:
            return state
    }
 }