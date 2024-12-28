import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

export const ItemLarge = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  padding: theme.spacing(3),
  textAlign: 'left',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
}));
