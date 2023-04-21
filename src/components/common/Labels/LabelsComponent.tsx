import { useState } from 'react';
import Chip from '@mui/material/Chip';
import Input from '@mui/material/Input';

import { ListItem,InputContainer } from './LabelComponentStyles';

interface Props {
  labels: string[];
  taskId: string;
  updateLabels: (id: string, labels: string[]) => void;
}

const LabelsComponent = ({ labels, taskId, updateLabels }: Props) => {
  const [chips, setChips] = useState<string[]>(labels);
  const [inputValue, setInputValue] = useState('');

  const handleDelete = (index: number) => {
    let newChips = chips.filter((_, i) => i !== index);
    setChips(newChips);
    updateLabels(taskId, newChips);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
        event.preventDefault();
        const newLabel = inputValue.trim();
        if (newLabel !== '') {
            setChips([...chips, newLabel]);
            updateLabels(taskId, [...chips, newLabel]);
            setInputValue('');
        }
    }
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
            <ListItem key="end-index">
                <InputContainer>
                    <Input
                    placeholder="Agregar etiqueta"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    size="small"
                    />
                </InputContainer>
            </ListItem>
        </>
    );
};

export default LabelsComponent;
