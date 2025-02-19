import { Habit, HabitRecord } from "../interfaces";
import { properties } from "../properties";

const getHeaders = (sessionToken: string | null) => {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	return headers;
};

export const fetchHabits = async (
    page: number = 1,
    limit: number = 10,
    sessionToken: string | null
) => {
    const headers = getHeaders(sessionToken);
    const response = await fetch(
        `${properties.api_url}/habits?page=${page}&limit=${limit}`,
        { headers, credentials: "include" }
    );
    return response.json();
};

export const createHabit = async (habit: Habit, sessionToken: string | null) => {
    const headers = getHeaders(sessionToken);
    return fetch(`${properties.api_url}/tasks`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(habit),
    }).then((res) => res.json());
};

export const deleteHabitById = async (id: string, sessionToken: string | null) => {
    const headers = getHeaders(sessionToken);
    return fetch(`${properties.api_url}/habits/${id}`, {
        method: "DELETE",
        headers,
        credentials: "include",
    });
};

export const patchHabit = async (
    id: string,
    data: Record<string, unknown>,
    sessionToken: string | null
) => {
    const headers = getHeaders(sessionToken);
    return fetch(`${properties.api_url}/habits/${id}`, {
        method: "PATCH",
        headers,
        credentials: "include",
        body: JSON.stringify(data),
    });
};

/* Habits records */

export const getHabitRecordsByPeriod = async (
    habitId: string,
    startDate: string,
    endDate: string,
    sessionToken: string | null
) => {
    const headers = getHeaders(sessionToken);
    const response = await fetch(
        `${properties.api_url}/habit/${habitId}/habit-records/range/${startDate}/${endDate}`,
        { headers, credentials: "include" }
    );
    return response.json();
}

export const createHabitRecord = async ( habitRecord: HabitRecord, sessionToken: string | null) => {
    const headers = getHeaders(sessionToken);
    return fetch(`${properties.api_url}/habit-records`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(habitRecord),
    }).then((res) => res.json());
}

