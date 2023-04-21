import { styled } from '@mui/material/styles';

export const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));
  
export const InputContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(0.5),
}));