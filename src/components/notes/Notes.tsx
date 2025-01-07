import { useCallback, useEffect, useReducer, useState } from "react";
import { notesReducer, initialState } from "../../reducers/notes";
import { ReducerActionType } from "../../actions/notes";

import NoteList from "./NoteList";
import CreateNoteModalComponent from "./modal/CreateNoteModal";
import {
	Container,
	Header,
	Footer,
	ItemLoading,
	Content,
} from "./styles/NotesStyles";
import { ListFooterBox } from "../tasks/styles/TasksStyles";
import { CircularProgress, Pagination } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import Cookies from "js-cookie";
import {
	createNote,
	deleteNoteById,
	fetchNotes,
	patchNote,
} from "../../services/notesServices";
import { Note } from "../../interfaces/notes";

const Notes = () => {
	const [state, dispatch] = useReducer(notesReducer, initialState);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [sessionToken, setSessionToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => setPage(value);

	const fetchAllNotes = useCallback(
		async (page: number, limit: number) => {
			setLoading(true);
			try {
				const responseJson = await fetchNotes(
					page,
					limit,
					sessionToken
				);
				dispatch({
					type: ReducerActionType.GET_ALL_NOTES,
					payload: responseJson.notes,
				});
				if (responseJson.count > 0) {
					setTotalPages(Math.ceil(responseJson.count / limit));
				}
			} catch (error) {
				console.error("Error fetching notes", error);
			} finally {
				setLoading(false);
			}
		},
		[sessionToken]
	);

	const deleteNote = async (id: string) => {
		try {
			await deleteNoteById(id, sessionToken);
			dispatch({ type: ReducerActionType.DELETE_NOTES, payload: id });
		} catch (error) {
			console.error("Error deleting note", error);
		}
	};

	const addNote = async (note: Note) => {
		try {
			const createdNote = await createNote(note, sessionToken);
			dispatch({
				type: ReducerActionType.ADD_NOTE,
				payload: createdNote,
			});
		} catch (error) {
			console.error("Error creating note", error);
		}
	};

	const updateLabels = (id: string, labels: string[]) =>
		patchNote(id, { labels }, sessionToken);

	const updateFavorite = (id: string, favorite: boolean) => {
		dispatch({ type: ReducerActionType.FAVORITE, payload: id });
		patchNote(id, { favorite: !favorite }, sessionToken).catch(() => {
			dispatch({ type: ReducerActionType.FAVORITE, payload: id });
		});
	};

	useEffect(() => {
		const token = Cookies.get("PROD-APP-AUTH");
		if (token) setSessionToken(token);
		fetchAllNotes(page, 9);
	}, [fetchAllNotes, page]);

	return (
		<Container>
			<Header>
				<h1>
					<NotesIcon /> Notes
				</h1>
			</Header>
			<CreateNoteModalComponent addNote={addNote} />
			{loading ? (
				<ItemLoading>
					<CircularProgress />
				</ItemLoading>
			) : (
				<Content>
					<NoteList
						notes={state.notes}
						deleteNote={deleteNote}
						updateLabels={updateLabels}
						updateFavorite={updateFavorite}
					/>
				</Content>
			)}
			<Footer>
				<ListFooterBox>
					<Pagination
						count={totalPages}
						page={page}
						onChange={handlePageChange}
						variant="outlined"
						color="primary"
					/>
				</ListFooterBox>
			</Footer>
		</Container>
	);
};

export default Notes;
