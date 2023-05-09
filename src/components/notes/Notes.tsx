import { useCallback, useEffect, useReducer, useState } from "react";
import { ReducerActionType } from "../../actions/notes";
import { notesReducer, initialState } from "../../reducers/notes";

import NoteList from "./NoteList";
import { ItemHeader, Item, ItemFooter, ItemLoading } from "./styles/NotesStyles";
import { properties } from "../../properties";
import { ListFooterBox } from "../tasks/styles/TasksStyles";
import { CircularProgress, Pagination } from "@mui/material";

import Cookies from "js-cookie";
import CreateNoteModalComponent from "./modal/CreateNoteModal";
import { Note } from "../../interfaces/tasks/interfaces";

interface HeadersInit {
    headers: Headers;
    credentials: RequestCredentials;
}

const Notes = () => {
    const [state, dispatch] = useReducer(notesReducer, initialState);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sessionToken, setSessionToken] = useState<string | null>(null);
    const [loading, setloading] = useState(false)
    
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

    const fetchAllNotes = useCallback(async (page: number, limit: number) => {
        
        try {
            setloading(true)
            const headers = new Headers() as HeadersInit["headers"];
            headers.append("Cookie", `PROD-APP-AUTH=${sessionToken}`);

            const response = await fetch(
                `${properties.api_url}/notes?page=${page}&limit=${limit}`,
                {
                    headers,
                    credentials: "include",
                }
            );

            if (response.ok) {
                const responseJson = await response.json();
                dispatch({
                    type: ReducerActionType.GET_ALL_NOTES,
                    payload: responseJson.notes,
                });
                if (responseJson.count > 0) {
                    setTotalPages(Math.trunc(responseJson.count / limit) + 1);
                }
                setloading(false)
            } else if (response.status === 403) {
                    throw new Error(
                        "Forbidden, no hay acceso al recurso solicitado"
                    ); 
            } else {
                throw new Error("Error en la respuesta de la API");
            }
            } catch (error) {
                console.log("Error", error);
            }
    },[sessionToken]);

    const deleteNote = async (id: string) => {
        try {
            const headers = new Headers() as HeadersInit["headers"];
            headers.append("Cookie", `PROD-APP-AUTH=${sessionToken}`);

            const response = await fetch(`${properties.api_url}/notes/${id}`, {
                method: "DELETE",
                headers,
                credentials: "include",
            });

            if (!response.ok) {
                console.log("Error", response);
            } else {
                dispatch({ type: ReducerActionType.DELETE_NOTES, payload: id });
            }
        } catch (response) {
            console.log("Error", response);
        }
    };

    const addNote = async (note: Note): Promise<void> => {
        try {
            const headers = new Headers();
            headers.append('Cookie', `PROD-APP-AUTH=${sessionToken}`);
            headers.append('Content-Type', 'application/json');

            const response = await fetch(properties.api_url + "/notes", {
                method: 'POST',
                headers,
                credentials: 'include',
                body: JSON.stringify(note),
            });

            if (!response.ok) {
                console.log("Error", response);
                return;
            }

            const responseJson = await response.json();
            const createdNote: Note = responseJson;
            console.log(createdNote)
            dispatch({type: ReducerActionType.ADD_NOTE, payload: createdNote});
        } catch (error) {
            console.log("Error", error);
        }
    }

    useEffect(() => {
        const token = Cookies.get('PROD-APP-AUTH');
        if(token)
            setSessionToken(token);    
        
        fetchAllNotes(page, 9);
    }, [fetchAllNotes,page]);

    return (
        <>   
            <ItemHeader><h1>Notes</h1><CreateNoteModalComponent addNote={addNote}/></ItemHeader>
            { loading && 
                <ItemLoading>
                    <CircularProgress />
                </ItemLoading>
            }
            { !loading && 
                <Item>
                    <NoteList notes={state.notes} deleteNote={deleteNote}/>
                </Item>
            }
            <ItemFooter>
                <ListFooterBox>
                        <Pagination count={totalPages} page={page} onChange={handlePageChange} variant="outlined" color="primary" />
                </ListFooterBox>
            </ItemFooter>
        </> 
    )
}

export default Notes