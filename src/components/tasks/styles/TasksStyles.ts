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

export const TaskContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    margin: theme.spacing(1, 0),
    background: theme.palette.mode === "dark" 
        ? "linear-gradient(90deg, #1a2027 0%, #282c34 100%)" 
        : "linear-gradient(90deg, #ffffff 0%, #f8f8f8 100%)",
    boxShadow: theme.palette.mode === "dark"
        ? "0px 4px 10px rgba(0, 0, 0, 0.3)"
        : "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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

export const ItemFooter = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    background: theme.palette.mode === "dark" ? "#1A2027" : "#f5f5f5",
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginTop: "10px",
    boxShadow: "none",
}));

export const CompletedText = styled(Typography)(({ theme }) => ({
    textDecoration: "line-through",
    color: theme.palette.grey[500],
}));

export const Container = styled("div")({
	display: "flex",
	flexDirection: "column",
	padding: "16px",
	gap: "16px",
});

export const Header = styled("header")({
	textAlign: "center",
	backgroundColor: "#f5f5f5",
	borderRadius: "14px",
	boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop: "50px",
});

export const Content = styled("main")({
	display: "flex",
	flexDirection: "column",
	gap: "16px",
});

export const Footer = styled("footer")({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	padding: "8px 0",
});

export const FabContainer = styled("div")({
	position: "fixed",
	bottom: "16px",
	right: "16px",
});

