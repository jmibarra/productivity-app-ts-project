import { useEffect, useReducer, useState } from "react"
import { ReducerActionType } from "../../actions/notes";
import { notesReducer, initialState } from "../../reducers/notes";

import NoteList from './NoteList';
import { ItemHeader,Item } from './styles/NotesStyles';
import { properties } from "../../properties";
import { ListFooterBox } from "../tasks/styles/TasksStyles";
import { Pagination } from "@mui/material";

import Cookies from 'js-cookie';

const Notes = () => {

    const [state, dispatch] = useReducer(notesReducer, initialState)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)

    useEffect(()=> {
        fetchAllNotes(page,5)
    },[page]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    async function fetchAllNotes(page:number, limit:number){
        try{
            const sessionToken = Cookies.get('PROD-APP-AUTH');
            const headers = new Headers();
            headers.append('Cookie', `PROD-APP-AUTH=${sessionToken}`);
            
            const response = await fetch(properties.api_url+'/notes?page='+page+'&limit='+limit, {
                headers,
                credentials: 'include'
              });
            
            if (response.ok) {
                const responseJson = await response.json();
                console.log(responseJson.notes);
                dispatch({type: ReducerActionType.GET_ALL_NOTES, payload: responseJson.notes});
                if(responseJson.count > 0){
                    setTotalPages(Math.trunc(responseJson.count/10)+1)
                }
            } else if (response.status === 403) {
                throw new Error("Forbidden, no hay acceso al recurso solicitado"); // Manejar la excepción aquí
            } else {
                throw new Error("Error en la respuesta de la API"); // Manejar otras excepciones aquí
            }
        } catch(error){
            console.log("Error", error);
            // Manejar la excepción aquí
        }
    }

    const deleteNote = (id:string):void => {
        try{
            const sessionToken = Cookies.get('PROD-APP-AUTH');
            const headers = new Headers();
            headers.append('Cookie', `PROD-APP-AUTH=${sessionToken}`);

            fetch(properties.api_url+'/notes/'+id, {
                method: 'DELETE',
                headers,
                credentials: 'include'
            })
            .then((response) => {
                if(!response.ok){
                    console.log("Error", response);
                }else{
                    dispatch({type: ReducerActionType.DELETE_NOTES,payload:id})
                }
            })
        }catch(response){
            console.log("Error", response);
        }
    }

    return (
        <>   
            <ItemHeader><h1>Notes</h1></ItemHeader>
            <Item>
                <NoteList notes={state.notes} deleteNote={deleteNote}/>
                <ListFooterBox>
                    <Pagination count={totalPages} page={page} onChange={handlePageChange} variant="outlined" color="primary" />
                </ListFooterBox>
            </Item>
        </> 
    )
}

export default Notes