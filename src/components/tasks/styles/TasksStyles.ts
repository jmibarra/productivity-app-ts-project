import { styled } from '@mui/material/styles';
import { Paper, Typography } from "@mui/material";

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginTop: '10px',
}));

export const ItemHeader = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginTop: '50px',
}));

export const ListFooterBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const CompletedText = styled(Typography)(({ theme }) => ({
    textDecoration: 'line-through',
    color: 'grey',
}));
