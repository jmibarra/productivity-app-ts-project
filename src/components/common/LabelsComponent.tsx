import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

interface Props {
    labels: string[]
    taskId: string
    updateLabels: (id:string, labels: string[]) => void
}

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export default function LabelsComponent({labels,taskId,updateLabels}: Props) {
    const [chips, setChips] = useState<string[]>(labels);

        const handleDelete = (index: number) => {
            let newChips = chips.filter((_, i) => i !== index)
            setChips(newChips)
            updateLabels(taskId,newChips)
        };

    return (
        <>
        {chips.map((data: string, index: number) => {
            return (
            <ListItem key={index}>
                <Chip label={data} onDelete={() => handleDelete(index)} />
            </ListItem>
            );
        })}
        </>
    );
}
