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
	Grid,
	Divider,
	IconButton,
} from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { blue, grey, red, yellow } from "@mui/material/colors";
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
import { initialState, taskListsReducer } from "../../../reducers/taksLists";

interface Props {
	addTask: (task: Task) => void;
	handleCloseModal: () => void;
	taskModalOpen: boolean;
}

const TaskForm = ({ addTask, taskModalOpen, handleCloseModal }: Props) => {
	const [labels, setLabels] = useState<string[]>([]);
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
	}, []);

	useEffect(() => {
		fetchAllLists();
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
		};
		addTask(task);
		handleCloseModal();
	};

	const updateLabels = (id: string, labels: string[]): void => {
		setLabels(labels);
	};

	const priorities = [
		{ value: 1, label: "Alta", icon: <PriorityHighIcon />, color: red[500] },
		{ value: 2, label: "Media", icon: <LowPriorityIcon />, color: yellow[700] },
		{ value: 3, label: "Baja", icon: <AcUnitIcon />, color: blue[500] },
		{ value: 4, label: "Ninguna", icon: <QuestionMarkIcon />, color: grey[500] },
	];

	return (
		<Dialog
			open={taskModalOpen}
			onClose={handleCloseModal}
			aria-labelledby="task-form-dialog"
			fullWidth
			maxWidth="sm"
			PaperProps={{
				style: { borderRadius: 16, padding: "16px" },
			}}
		>
			<DialogTitle id="task-form-dialog" sx={{ textAlign: "center", fontWeight: "bold", pb: 1 }}>
				Crear Nueva Tarea
			</DialogTitle>
			<form onSubmit={formik.handleSubmit}>
				<DialogContent>
					<Box display="flex" flexDirection="column" gap={3}>
						<TextField
							fullWidth
							variant="outlined"
							name="title"
							label="Título"
							placeholder="¿Qué necesitas hacer?"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.title}
							error={formik.touched.title && Boolean(formik.errors.title)}
							helperText={formik.touched.title && (formik.errors.title as string)}
							InputProps={{
								style: { borderRadius: 12 },
							}}
						/>
						
						<TextField
							fullWidth
							name="description"
							label="Descripción"
							placeholder="Agrega más detalles..."
							multiline
							rows={3}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.description}
							InputProps={{
								style: { borderRadius: 12 },
							}}
						/>

						<Grid container spacing={2}>
							<Grid size={{ xs: 12, sm: 6 }}>
								<Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold", color: "text.secondary" }}>
									Prioridad
								</Typography>
								<Box display="flex" gap={1}>
									{priorities.map((priority) => (
										<IconButton
											key={priority.value}
											onClick={() => formik.setFieldValue("priority", priority.value)}
											sx={{
												border: formik.values.priority === priority.value ? `2px solid ${priority.color}` : "1px solid transparent",
												backgroundColor: formik.values.priority === priority.value ? `${priority.color}20` : "transparent",
												color: priority.color,
												"&:hover": {
													backgroundColor: `${priority.color}10`,
												},
											}}
											title={priority.label}
										>
											{priority.icon}
										</IconButton>
									))}
								</Box>
							</Grid>
							<Grid size={{ xs: 12, sm: 6 }}>
								<Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold", color: "text.secondary" }}>
									Lista
								</Typography>
								<Select
									fullWidth
									displayEmpty
									name="list"
									value={formik.values.list}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.list && Boolean(formik.errors.list)}
									sx={{ borderRadius: "12px" }}
								>
									<MenuItem value="" disabled>
										<em>Selecciona una lista</em>
									</MenuItem>
									{state.taskLists.map((list) => (
										<MenuItem key={list._id} value={list._id}>
											{list.name}
										</MenuItem>
									))}
								</Select>
								{formik.touched.list && formik.errors.list && (
									<Typography variant="caption" color="error" sx={{ ml: 2 }}>
										{formik.errors.list as string}
									</Typography>
								)}
							</Grid>
						</Grid>

						<Box>
							<Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold", color: "text.secondary" }}>
								Fecha de Vencimiento
							</Typography>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateTimePicker
									sx={{ width: "100%", "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
									value={formik.values.dueDate ? dayjs(formik.values.dueDate) : null}
									format="DD/MM/YYYY HH:mm"
									onChange={(newValue) => {
										formik.setFieldValue("dueDate", newValue?.toISOString() || null);
									}}
								/>
							</LocalizationProvider>
						</Box>

						<Divider />
						
						<Box>
							<Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold", color: "text.secondary" }}>
								Etiquetas
							</Typography>
							<LabelsComponent
								labels={labels}
								taskId=""
								updateLabels={updateLabels}
							/>
						</Box>
					</Box>
				</DialogContent>
				<DialogActions sx={{ justifyContent: "center", pb: 2, gap: 2 }}>
					<Button
						onClick={handleCloseModal}
						color="inherit"
						sx={{ borderRadius: "8px", textTransform: "none" }}
					>
						Cancelar
					</Button>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={!formik.isValid || formik.isSubmitting}
						disableElevation
						sx={{ borderRadius: "8px", textTransform: "none", px: 4, fontWeight: "bold" }}
					>
						Crear Tarea
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default TaskForm;
