import { Reducer } from "react";
import { ReducerActionType } from "../actions/tasksLists";
import { TaskList, TaskListsState } from "../interfaces";

export type ReducerAction = {
    type: ReducerActionType;
    payload?: any;
};

export const initialState:TaskListsState = {
    taskLists: [],
    loading: false,
}

export const taskListsReducer: Reducer<TaskListsState, ReducerAction> = (state = initialState, action) => {
    switch(action.type){
        case ReducerActionType.GET_USER_LISTS:
            return{
                ...state,
                taskLists: action.payload,
            };
        case ReducerActionType.CREATE_LIST:
            return {
                ...state,
                taskLists: [action.payload,...state.taskLists]
            };
        case ReducerActionType.DELETE_LIST: {
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