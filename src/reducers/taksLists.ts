import { Reducer } from "react";
import { ReducerTaskListActionType } from "../actions/tasksLists";
import { TaskList, TaskListsState } from "../interfaces";

export type ReducerAction = {
    type: ReducerTaskListActionType;
    payload?: any;
};

export const initialState:TaskListsState = {
    taskLists: [],
    loading: false,
}

export const taskListsReducer: Reducer<TaskListsState, ReducerAction> = (state = initialState, action) => {
    switch(action.type){
        case ReducerTaskListActionType.GET_USER_LISTS:
            return{
                ...state,
                taskLists: action.payload,
            };
        case ReducerTaskListActionType.CREATE_LIST:
            return {
                ...state,
                taskLists: [...state.taskLists, action.payload]
            };
        case ReducerTaskListActionType.DELETE_LIST: {
            const newTaskLists = state.taskLists.filter(
                (taskList:TaskList) => taskList._id !== action.payload
            ) as TaskList[];
            return{
                ...state,
                taskLists: newTaskLists,
            };
        }
        default:
            return state
    }
}