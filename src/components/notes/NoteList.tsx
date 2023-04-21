

import { Note } from '../../interfaces/tasks/interfaces';

import Grid from '@mui/material/Grid';
import NoteComponent from './Note';

interface Props {
    notes: Note[],
}

const NoteList = ({notes}:Props) => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {notes.map((note:Note, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <NoteComponent note={note} index={index}/>
        </Grid>
      ))}
    </Grid>
  )
}

export default NoteList