import { Reducer } from "react";
import { ReducerActionType } from "../actions/notes"
import { Note, NotesState } from "../interfaces/tasks/interfaces";

export type ReducerAction = {
    type: ReducerActionType;
    payload?: any;
};

export const initialState:NotesState = {
    notes: [],
    loading: false,
}

export const notesReducer: Reducer<NotesState, ReducerAction> = (state = initialState, action) => {
    switch(action.type) {
        case ReducerActionType.GET_ALL_NOTES:
            return {
                ...state, 
                notes: action.payload
            };
        case ReducerActionType.DELETE_NOTES: {
            const newNotes = state.notes.filter(
                (note:Note) => note._id !== action.payload
            ) as Note[];
            return{
                ...state,
                notes: newNotes,
            };
        }
        default:
            return state
    }
 }