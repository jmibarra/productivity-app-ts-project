import { Reducer } from "react";
import { ReducerActionType } from "../actions/habits";
import { Habit, HabitsState } from "../interfaces/habits";

export type ReducerAction = {
    type: ReducerActionType;
    payload?: any;
};

export const initialState:HabitsState = {
    habits: [],
    loading: false,
}

export const habitsReducer: Reducer<HabitsState, ReducerAction> = (state = initialState, action) => {
    switch(action.type) {
        case ReducerActionType.GET_ALL_HABITS:
            return {
                ...state, 
                habits: action.payload
            };
        case ReducerActionType.CREATE_HABIT:
            return {
                ...state, 
                habits: [action.payload,...state.habits,]
            };
        case ReducerActionType.DELETE_HABIT:
            return {
                ...state, 
                habits: state.habits.filter((habit) => habit._id !== action.payload)
            };
        case ReducerActionType.UPDATE_HABIT: {
            const updatedHabits = state.habits.map((habit) => {
                if (habit._id === action.payload._id) {
                    return action.payload;
                }
                return habit;
            });
            return {
                ...state,
                habits: updatedHabits,
            };
        }
        case ReducerActionType.GET_HABIT: {
            const selectedHabit = state.habits.find(
                (habit:Habit) => habit._id === action.payload.id
            );

            return {
                ...state,
                selectedHabit:selectedHabit as Habit,
            };
        }
        default:
            return state;
    }
}