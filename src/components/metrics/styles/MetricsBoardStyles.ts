import { styled } from "@mui/material/styles";

export const Container = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    gap: "16px",
});

export const Title = styled("h1")({
    fontSize: "24px",
    fontWeight: "bold",
});

export const Options = styled("div")({
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
    "& button": {
        padding: "8px 12px",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#e0e0e0",
        cursor: "pointer",
        transition: "background-color 0.3s",
        "&.active": {
            backgroundColor: "#1976d2",
            color: "#fff",
        },
    },
});

export const Content = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    justifyContent: "center",
});

export const Card = styled("div")({
    padding: "16px",
    width: "280px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
});

export const Graph = styled("div")({
    height: "150px",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
});

export const Data = styled("div")({
    fontSize: "18px",
    fontWeight: "500",
    textAlign: "center",
});
