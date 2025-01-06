// /services/notesService.ts
import { Note } from "../interfaces/interfaces";
import { properties } from "../properties";

const getHeaders = (sessionToken: string | null) => {
	const headers = new Headers();
	headers.append("Cookie", `PROD-APP-AUTH=${sessionToken}`);
	headers.append("Content-Type", "application/json");
	return headers;
};

export const fetchNotes = async (
	page: number,
	limit: number,
	sessionToken: string | null
) => {
	const headers = getHeaders(sessionToken);
	const response = await fetch(
		`${properties.api_url}/notes?page=${page}&limit=${limit}`,
		{ headers, credentials: "include" }
	);
	return response.json();
};

export const deleteNoteById = async (id: string, sessionToken: string | null) => {
	const headers = getHeaders(sessionToken);
	return fetch(`${properties.api_url}/notes/${id}`, {
		method: "DELETE",
		headers,
		credentials: "include",
	});
};

export const createNote = async (note: Note, sessionToken: string | null) => {
	const headers = getHeaders(sessionToken);
	return fetch(`${properties.api_url}/notes`, {
		method: "POST",
		headers,
		credentials: "include",
		body: JSON.stringify(note),
	}).then((res) => res.json());
};

export const patchNote = async (
	id: string,
	data: Record<string, unknown>,
	sessionToken: string | null
) => {
	const headers = getHeaders(sessionToken);
	return fetch(`${properties.api_url}/notes/${id}`, {
		method: "PATCH",
		headers,
		credentials: "include",
		body: JSON.stringify(data),
	});
};
