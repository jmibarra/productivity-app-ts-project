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
    sessionToken: string | null
) => {
    const headers = getHeaders(sessionToken);
    const response = await fetch(
        `${properties.api_url}/tasks?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
        { headers, credentials: "include" }
    );
    return response.json();
};