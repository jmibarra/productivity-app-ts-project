import Chip from '@mui/material/Chip';

interface Props {
    completed: boolean;
}

export default function StatusChipComponent({completed}:Props) {

    if(completed)
        return (
            <Chip label="Completa" color="success"/>
        )
    else
        return(
            <Chip label="Pendiente"/>
        )
}
