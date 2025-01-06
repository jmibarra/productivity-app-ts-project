import { styled } from "@mui/material/styles";

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

export const Content = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
});

export const HabitList = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const HabitItem = styled("div")({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "16px",
});

export const HabitInfo = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  "& h3": {
    margin: 0,
  },
  "& p": {
    margin: 0,
    fontSize: "12px",
    color: "#888",
  },
});

export const Calendar = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  marginTop: "8px",
  "& div": {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    fontSize: "12px",
  },
  "& .checked": {
    backgroundColor: "#4caf50",
    color: "#fff",
  },
  "& .unchecked": {
    backgroundColor: "#f5f5f5",
    color: "#fff",
  },
});

export const HabitStats = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const StatsGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
});

export const StatsBox = styled("div")({
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "16px",
  textAlign: "center",
  "& h3": {
    margin: 0,
    fontSize: "14px",
    color: "#333",
  },
  "& p": {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
    color: "#4caf50",
  },
});

export const MonthlyCalendar = styled("div")({
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "16px",
  "& h3": {
    marginBottom: "16px",
    textAlign: "center",
  },
  "& .calendar-grid": {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "8px",
    "& .day": {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#eee",
      fontSize: "12px",
    },
    "& .checked": {
      backgroundColor: "#4caf50",
      color: "#fff",
    },
    "& .unchecked": {
      backgroundColor: "#f44336",
      color: "#fff",
    },
  },
});
