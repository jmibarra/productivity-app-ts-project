import { styled } from "@mui/material/styles";

export const CalendarContainer = styled("div")({
  display: "grid",
  gap: "32px",
});

export const Weekdays = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  color: "gray",
  fontWeight: "bold",
  textAlign: "center",
});

export const DaysGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
});

export const Day = styled("div")<{ completed: boolean }>(
  ({ completed }) => ({
    textAlign: "center",
    padding: "10px",
    border: "1px solid #ddd",
    backgroundColor: completed ? "lightgreen" : "white",
    cursor: "pointer",
  })
);

