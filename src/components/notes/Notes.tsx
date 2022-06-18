import NoteList from './NoteList';
import { ItemHeader,Item } from './styles/NotesStyles';

const Notes = () => {

    return (
        <>   
            <ItemHeader><h1>Notes</h1></ItemHeader>
            <Item><NoteList/></Item>
        </> 
    )
}

export default Notes