import { TaskList } from "../interfaces";
import { properties } from "../properties";

const getHeaders = () => {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	return headers;
};

export const fetchUserLists = async (
    sessionToken: string | null
) => {
    const headers = getHeaders();
    const url = `${properties.api_url}/lists`;
    const response = await fetch(
        url,
        { headers, credentials: "include" }
    );
    return response.json();
};

export const createTaskList = async (taskList: TaskList, sessionToken: string | null) => {
    const headers = getHeaders();
    return fetch(`${properties.api_url}/lists`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(taskList),
    }).then((res) => res.json());
};

export const deleteTaskList = async (id: string) => {
    const headers = getHeaders();
    return fetch(`${properties.api_url}/lists/${id}`, {
        method: "DELETE",
        headers,
        credentials: "include",
    });
};