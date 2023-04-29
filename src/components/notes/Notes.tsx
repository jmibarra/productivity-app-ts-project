import { useEffect, useReducer, useState } from "react"
import { ReducerActionType } from "../../actions/notes";
import { notesReducer, initialState } from "../../reducers/notes";

import NoteList from './NoteList';
import { ItemHeader,Item } from './styles/NotesStyles';
import { properties } from "../../properties";
import { ListFooterBox } from "../tasks/styles/TasksStyles";
import { Pagination } from "@mui/material";

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
            const response = await fetch(properties.api_url+'/notes?page='+page+'&limit='+limit);
            if (response.ok) {
                const responseJson = await response.json();
                console.log(responseJson);
                dispatch({type: ReducerActionType.GET_ALL_NOTES, payload: responseJson});
                if(responseJson.count > 0){
                    // setTotalPages(Math.trunc(responseJson.size()/10)+1)
                    setTotalPages(1) // Tengo que pagar para pasar datos y modificar el endpoint lo hago simple hasta tener mi api
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
    
    

    return (
        <>   
            <ItemHeader><h1>Notes</h1></ItemHeader>
            <Item>
                <NoteList notes={state.notes}/>
                <ListFooterBox>
                    <Pagination count={totalPages} page={page} onChange={handlePageChange} variant="outlined" color="primary" />
                </ListFooterBox>
            </Item>
        </> 
    )
}

export default Notes