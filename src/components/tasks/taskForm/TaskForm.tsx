import { useCallback, useEffect, useReducer, useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
	Box,
	Select,
	MenuItem,
	InputLabel,
	Grid,
	Divider,
} from "@mui/material";
import shortid from "shortid";
import { Task } from "../../../interfaces";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./schemas";
import * as Yup from "yup";
import LabelsComponent from "../../common/Labels/LabelsComponent";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fetchUserLists } from "../../../services/taskListsServices";
import { ReducerTaskListActionType } from "../../../actions/tasksLists";
import Cookies from "js-cookie";
import { initialState, taskListsReducer } from "../../../reducers/taksLists";

interface Props {
	addTask: (task: Task) => void;
	handleCloseModal: () => void;
	taskModalOpen: boolean;
}

const TaskForm = ({ addTask, taskModalOpen, handleCloseModal }: Props) => {
	const [labels, setLabels] = useState<string[]>([]);
	const [sessionToken, setSessionToken] = useState<string | null>(null);
	const [state, dispatch] = useReducer(taskListsReducer, initialState);

	const fetchAllLists = useCallback(async () => {
		try {
			const responseJson = await fetchUserLists();
			dispatch({
				type: ReducerTaskListActionType.GET_USER_LISTS,
				payload: responseJson,
			});
		} catch (error) {
			console.error("Error fetching lists", error);
		}
	}, [sessionToken]);

	useEffect(() => {
		const token = Cookies.get("PROD-APP-AUTH");
		if (token) {
			setSessionToken(token);
			fetchAllLists();
		}
	}, [fetchAllLists]);

	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object(validationSchema),
		onSubmit: (values) => {
			createTask(values);
			setLabels([]);
			formik.resetForm();
		},
	});

	const createTask = (object: any) => {
		let task: Task = {
			...object,
			id: shortid.generate(),
			completed: false,
			labels: labels,
			priority: 4,
		};
		addTask(task);
		handleCloseModal();
	};

	const updateLabels = (id: string, labels: string[]): void => {
		setLabels(labels);
	};

	return (
		<Dialog
			open={taskModalOpen}
			onClose={handleCloseModal}
			aria-labelledby="task-form-dialog"
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle id="task-form-dialog" sx={{ textAlign: "center" }}>
				<Typography variant="h6">Crear Nueva Tarea</Typography>
			</DialogTitle>
			<form onSubmit={formik.handleSubmit}>
				<DialogContent>
					<Grid container spacing={2}>
						{/* Sección Principal */}
						<Grid item xs={12}>
							<Box mb={2}>
								<TextField
									fullWidth
									variant="outlined"
									name="title"
									label="Título"
									placeholder="Ingresa el título de la tarea"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.title}
									error={
										formik.touched.title &&
										Boolean(formik.errors.title)
									}
									helperText={
										formik.touched.title &&
										formik.errors.title
									}
								/>
							</Box>
							<TextField
								fullWidth
								name="description"
								label="Descripción"
								placeholder="Ingresa una descripción"
								multiline
								rows={4}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.description}
								error={
									formik.touched.description &&
									Boolean(formik.errors.description)
								}
								helperText={
									formik.touched.description &&
									formik.errors.description
								}
							/>
						</Grid>

						{/* Sección Izquierda */}
						<Grid item xs={6}>
							<Box mb={2}>
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
								>
									<DateTimePicker
										label="Fecha de vencimiento"
										value={
											formik.values.dueDate
												? dayjs(formik.values.dueDate)
												: null
										}
										format="DD/MM/YYYY HH:mm"
										onChange={(newValue) => {
											formik.setFieldValue(
												"dueDate",
												newValue?.toISOString() || null
											);
										}}
									/>
								</LocalizationProvider>
							</Box>
							<Box>
								<InputLabel
									id="list-select-label"
									sx={{ mb: 1 }}
								>
									Lista
								</InputLabel>
								<Select
									fullWidth
									labelId="list-select-label"
									name="list"
									value={formik.values.list}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.list &&
										Boolean(formik.errors.list)
									}
								>
									{state.taskLists.map((list) => (
										<MenuItem
											key={list._id}
											value={list._id}
										>
											{list.name}
										</MenuItem>
									))}
								</Select>
							</Box>
						</Grid>
					</Grid>

					{/* Sección Etiquetas */}
					<Divider sx={{ my: 3 }} />
					<Box>
						<LabelsComponent
							labels={labels}
							taskId=""
							updateLabels={updateLabels}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleCloseModal}
						variant="outlined"
						color="secondary"
					>
						Cancelar
					</Button>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={!formik.isValid || formik.isSubmitting}
					>
						Agregar Tarea
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default TaskForm;
