import { useCallback, useEffect, useReducer, useState } from "react";
import { Container, Box, Typography, CircularProgress, Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HabitsList from "./HabitsList";
import { Habit } from "../../interfaces";
import HabitStats from "./HabitStats";
import { ReducerActionType as HabitsReducerActionType } from "../../actions/habits";
import { habitsReducer, initialState } from "../../reducers/habits";
import { fetchHabits, createHabit } from "../../services/habitsServices";
import CreateHabitModal from "./modal/CreateHabitModal";

const Habits = () => {
	const [state, dispatch] = useReducer(habitsReducer, initialState);
	const [loading, setLoading] = useState(false);
	const [selectedHabit, setSelectedHabit] = useState<Habit | undefined>();
	const [createModalOpen, setCreateModalOpen] = useState(false);

	const fetchAllHabits = useCallback(async () => {
		setLoading(true);
		try {
			const responseJson = await fetchHabits(1, 10);
			dispatch({
				type: HabitsReducerActionType.GET_ALL_HABITS,
				payload: responseJson.habits,
			});
			if (responseJson.habits.length > 0 && !selectedHabit) {
				setSelectedHabit(responseJson.habits[0]);
			}
		} catch (error) {
			console.error("Error fetching habits", error);
		} finally {
			setLoading(false);
		}
	}, [selectedHabit]);

	useEffect(() => {
		fetchAllHabits();
	}, [fetchAllHabits]);

	const handleAddHabit = async (habit: Habit) => {
		try {
			// In a real app, you would call the API here
			// const newHabit = await createHabit(habit);
			// For now, we simulate adding it to the state
			dispatch({
				type: HabitsReducerActionType.CREATE_HABIT,
				payload: habit,
			});
		} catch (error) {
			console.error("Error creating habit", error);
		}
	};

	return (
		<Container maxWidth="xl" sx={{ py: 4, mt: 8 }}>
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
				<Typography variant="h4" fontWeight="bold">
					Hábitos
				</Typography>
				<Fab 
					color="primary" 
					aria-label="add" 
					onClick={() => setCreateModalOpen(true)}
					variant="extended"
					sx={{ fontWeight: "bold" }}
				>
					<AddIcon sx={{ mr: 1 }} />
					Nuevo Hábito
				</Fab>
			</Box>

			{loading ? (
				<Box display="flex" justifyContent="center" mt={4}>
					<CircularProgress />
				</Box>
			) : (
				<Grid container spacing={4}>
					{/* Columna izquierda: Lista de hábitos */}
					<Grid size={{ xs: 12, md: 4 }}>
						<HabitsList
							habits={state.habits}
							setSelectedHabit={setSelectedHabit}
						/>
					</Grid>
					{/* Columna derecha: Estadísticas y calendario mensual */}
					<Grid size={{ xs: 12, md: 8 }}>
						<HabitStats selectedHabit={selectedHabit} />
					</Grid>
				</Grid>
			)}

			<CreateHabitModal
				open={createModalOpen}
				handleClose={() => setCreateModalOpen(false)}
				addHabit={handleAddHabit}
			/>
		</Container>
	);
};

export default Habits;
