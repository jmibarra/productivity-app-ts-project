import { styled } from '@mui/material/styles';

export const Header = styled("header")({
	textAlign: "center",
	backgroundColor: "#f5f5f5",
	borderRadius: "14px",
	boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop: "50px",
    width: "100%",
});

export const Container = styled("div")({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: "16px",
	gap: "16px",
});

export const Content = styled("main")({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "16px",
	width: "100%",
	maxWidth: "400px"
});

export const AvatarSection = styled("div")({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	marginBottom: "16px",
});

export const Section = styled("section")({
	width: "100%",
	padding: "16px",
	backgroundColor: "#fff",
	borderRadius: "8px",
	boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
	display: "flex",
	flexDirection: "column",
	gap: "8px"
});

export const DangerSection = styled(Section)({
	backgroundColor: "#ffe6e6",
	border: "1px solid #ff4d4d",
	textAlign: "center"
});