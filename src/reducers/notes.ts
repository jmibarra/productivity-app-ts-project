import { Reducer } from "react";
import { ReducerActionType } from "../actions/notes"
import { Note, NotesState } from "../interfaces/interfaces";

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
        case ReducerActionType.ADD_NOTE: {
            return {
                ...state,
                notes: [action.payload,...state.notes]
            }
        }
        case ReducerActionType.FAVORITE: {

            const clonedNotes = [...state.notes]
            const selectedNote = state.notes.find(
                (note:Note) => note._id === action.payload
            );
            
            const newNote = {...selectedNote}

            newNote.favorite = !selectedNote?.favorite

            const updatedNotes = clonedNotes.map(note => note._id === newNote._id ? newNote : note);

            return {
                ...state, 
                notes: updatedNotes
             };
        }
        default:
            return state
    }
 }