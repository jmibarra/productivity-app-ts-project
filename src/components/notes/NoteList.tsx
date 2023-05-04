

import { Note } from '../../interfaces/tasks/interfaces';

import Grid from '@mui/material/Grid';
import NoteComponent from './Note';
import { memo } from 'react';

interface Props {
    notes: Note[],
    deleteNote: (id: string) => void
}

const NoteList = ({notes, deleteNote}:Props) => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {notes.map((note:Note, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <NoteComponent note={note} index={index} deleteNote={deleteNote}/>
        </Grid>
      ))}
    </Grid>
  )
}

export default memo(NoteList)