import Note from './Note'

import Grid from '@mui/material/Grid';

const NoteList = () => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {Array.from(Array(9)).map((_, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <Note/>
        </Grid>
      ))}
    </Grid>
  )
}

export default NoteList