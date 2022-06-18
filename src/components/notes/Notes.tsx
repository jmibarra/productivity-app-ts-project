import React from 'react'
import { styled } from '@mui/material/styles';
import { Paper } from "@mui/material";

const Notes = () => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: '20px'
    }));

    return (
        <>   
            <Item><h1>Notes</h1></Item>
        </>
        
    )
}

export default Notes