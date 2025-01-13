import { TaskList } from "../interfaces";
import { properties } from "../properties";

const getHeaders = (sessionToken: string | null) => {
	const headers = new Headers();
	headers.append("Cookie", `PROD-APP-AUTH=${sessionToken}`);
	headers.append("Content-Type", "application/json");
	return headers;
};

export const fetchUserLists = async (
    sessionToken: string | null
) => {
    const headers = getHeaders(sessionToken);
    const url = `${properties.api_url}/lists`;
    const response = await fetch(
        url,
        { headers, credentials: "include" }
    );
    return response.json();
};

export const createTaskList = async (taskList: TaskList, sessionToken: string | null) => {
    const headers = getHeaders(sessionToken);
    return fetch(`${properties.api_url}/lists`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(taskList),
    }).then((res) => res.json());
};

export const deleteTaskList = async (id: string, sessionToken: string | null) => {
    const headers = getHeaders(sessionToken);
    return fetch(`${properties.api_url}/lists/${id}`, {
        method: "DELETE",
        headers,
        credentials: "include",
    });
};