import { styled } from '@mui/material/styles';

export const Header = styled("header")({
	textAlign: "center",
	backgroundColor: "#f5f5f5",
	borderRadius: "14px",
	boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop: "50px",
});

export const Container = styled("div")({
	display: "flex",
	flexDirection: "column",
	padding: "16px",
	gap: "16px",
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