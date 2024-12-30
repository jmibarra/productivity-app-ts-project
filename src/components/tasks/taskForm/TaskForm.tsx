import dayjs from "dayjs";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
	Box,
} from "@mui/material";
import shortid from "shortid";
import { Task } from "../../../interfaces/tasks/interfaces";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./schemas";
import * as Yup from "yup";
import LabelsComponent from "../../common/Labels/LabelsComponent";
import { Item } from "./TaskFormStyles";
import { useState } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { time } from "console";

interface Props {
	addTask: (task: Task) => void;
	handleCloseModal: () => void;
	taskModalOpen: boolean;
}

const TaskForm = ({ addTask, taskModalOpen, handleCloseModal }: Props) => {
	const [labels, setLabels] = useState<string[]>([]);

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
		console.log(object);
		let task: Task = {
			...object,
			id: shortid.generate(),
			completed: false,
			labels: labels,
			list: 1,
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
		>
			<DialogTitle id="task-form-dialog" sx={{ textAlign: "center" }}>
				<Typography variant="h6" component="div">
					Crear Nueva Tarea
				</Typography>
			</DialogTitle>
			<form onSubmit={formik.handleSubmit}>
				<DialogContent>
					{formik.errors.title && formik.touched.title && (
						<Typography color="error" variant="body2">
							{formik.errors.title}
						</Typography>
					)}
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
								formik.touched.title && formik.errors.title
							}
						/>
					</Box>
					<Box mb={2}>
						<TextField
							fullWidth
							name="description"
							label="Descripción"
							placeholder="Ingresa una descripción para la tarea"
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
					</Box>
					<Box mb={2}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
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
					<Item>
						<LabelsComponent
							labels={labels}
							taskId=""
							updateLabels={updateLabels}
						/>
					</Item>
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
