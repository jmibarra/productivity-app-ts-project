import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

interface Props {
    labels: any
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function LabelsComponent(props: Props) {
  const [chips, setChips] = useState<string[]>(props.labels);

  const handleDelete = (index: number) => {
    setChips((prevChips) => prevChips.filter((_, i) => i !== index));
    //TODO: esto debería ademas hacer el trabajo de eliminarlo del dato real, post a la api que maneja labels
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
