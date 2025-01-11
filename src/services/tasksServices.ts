import { Task } from "../interfaces";
import { properties } from "../properties";

const getHeaders = (sessionToken: string | null) => {
	const headers = new Headers();
	headers.append("Cookie", `PROD-APP-AUTH=${sessionToken}`);
	headers.append("Content-Type", "application/json");
	return headers;
};

export const fetchTasks = async (
    page: number,
    limit: number,
    sortBy: string,
    sortDirection: string,
    sessionToken: string | null,
    listId: string | null
) => {
    const headers = getHeaders(sessionToken);
    const url = buildFetchTaskUrl(page, limit, sortBy, sortDirection, listId)
    const response = await fetch(
        url,
        { headers, credentials: "include" }
    );
    return response.json();
};

export const createTask = async (task: Task, sessionToken: string | null) => {
    const headers = getHeaders(sessionToken);
    return fetch(`${properties.api_url}/tasks`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(task),
    }).then((res) => res.json());
};

export const deleteTaskById = async (id: string, sessionToken: string | null) => {
    const headers = getHeaders(sessionToken);
    return fetch(`${properties.api_url}/tasks/${id}`, {
        method: "DELETE",
        headers,
        credentials: "include",
    });
};

export const patchTask = async (
    id: string,
    data: Record<string, unknown>,
    sessionToken: string | null
) => {
    const headers = getHeaders(sessionToken);
    return fetch(`${properties.api_url}/tasks/${id}`, {
        method: "PATCH",
        headers,
        credentials: "include",
        body: JSON.stringify(data),
    });
};

const buildFetchTaskUrl = ( page: number, limit: number, sortBy: string, sortDirection: string, listId: string | null) => {
    let api_url = `${properties.api_url}/tasks`;
    if(listId && listId !== "all-tasks")
        api_url += `?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}`
    else
        api_url += `?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}`
        //api_url += `/list/${listId}?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}`

    return api_url
};
