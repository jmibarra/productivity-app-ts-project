import { useState,useReducer } from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

import { tasksReducer,initialState } from "../../reducers/tasks";
import { ReducerActionType } from '../../actions/tasks';

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
  const [state, dispatch] = useReducer(tasksReducer,initialState)

  const handleDelete = (index: number) => {
    setChips((prevChips) => prevChips.filter((_, i) => i !== index));
    updateLabels(taskId,chips)
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
