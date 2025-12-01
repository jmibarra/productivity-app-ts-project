import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	Box,
	Typography,
	IconButton,
	Grid,
	MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BookIcon from "@mui/icons-material/Book";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import LanguageIcon from "@mui/icons-material/Language";
import { Habit } from "../../../interfaces";
import shortid from "shortid";

interface Props {
	open: boolean;
	handleClose: () => void;
	addHabit: (habit: Habit) => void;
}

const validationSchema = Yup.object({
	name: Yup.string().required("El nombre es obligatorio"),
	description: Yup.string(),
	icon: Yup.string().required("Debes seleccionar un ícono"),
	frequencyType: Yup.string().required("Selecciona una frecuencia"),
	goalTarget: Yup.number().min(1, "El objetivo debe ser al menos 1").required("Define un objetivo"),
});

const icons = [
	{ name: "fitness", icon: <FitnessCenterIcon /> },
	{ name: "book", icon: <BookIcon /> },
	{ name: "water", icon: <WaterDropIcon /> },
	{ name: "food", icon: <RestaurantIcon /> },
	{ name: "meditation", icon: <SelfImprovementIcon /> },
	{ name: "work", icon: <WorkIcon /> },
	{ name: "code", icon: <CodeIcon /> },
	{ name: "language", icon: <LanguageIcon /> },
];

const CreateHabitModal = ({ open, handleClose, addHabit }: Props) => {
	const formik = useFormik({
		initialValues: {
			name: "",
			description: "",
			icon: "fitness",
			frequencyType: "daily",
			goalTarget: 1,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			const newHabit: Habit = {
				_id: shortid.generate(),
				user_id: "user_1", // Placeholder user ID
				name: values.name,
				description: values.description,
				icon: values.icon,
				goal: {
					type: "quantity",
					target: values.goalTarget,
				},
				frequency: {
					type: values.frequencyType as "daily" | "weekly" | "interval",
					details: {
						weekly_target: values.frequencyType === "weekly" ? values.goalTarget : undefined,
					},
				},
				streak: 0,
				created_at: new Date(),
			};
			addHabit(newHabit);
			handleClose();
			formik.resetForm();
		},
	});

	return (
		<Dialog 
			open={open} 
			onClose={handleClose} 
			fullWidth 
			maxWidth="sm"
			PaperProps={{
				sx: { borderRadius: "16px", p: 1 },
			}}
		>
			<DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Typography variant="h6" fontWeight="bold">Crear Nuevo Hábito</Typography>
				<IconButton onClick={handleClose} size="small">
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<form onSubmit={formik.handleSubmit}>
				<DialogContent>
					<Box display="flex" flexDirection="column" gap={3}>
						<TextField
							fullWidth
							label="Nombre del hábito"
							name="name"
							value={formik.values.name}
							onChange={formik.handleChange}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
							InputProps={{ sx: { borderRadius: "12px" } }}
						/>
						
						<TextField
							fullWidth
							label="Descripción (Opcional)"
							name="description"
							multiline
							rows={2}
							value={formik.values.description}
							onChange={formik.handleChange}
							InputProps={{ sx: { borderRadius: "12px" } }}
						/>

						<Box>
							<Typography variant="subtitle2" fontWeight="bold" gutterBottom>
								Selecciona un ícono
							</Typography>
							<Grid container spacing={1}>
								{icons.map((item) => (
							<Grid size={{ xs: "auto" }} key={item.name}>
										<IconButton
											onClick={() => formik.setFieldValue("icon", item.name)}
											sx={{
												border: formik.values.icon === item.name ? "2px solid #1976d2" : "1px solid transparent",
												backgroundColor: formik.values.icon === item.name ? "rgba(25, 118, 210, 0.1)" : "transparent",
												borderRadius: "12px",
											}}
										>
											{item.icon}
										</IconButton>
									</Grid>
								))}
							</Grid>
						</Box>

						<Grid container spacing={2}>
							<Grid size={{ xs: 6 }}>
								<TextField
									select
									fullWidth
									label="Frecuencia"
									name="frequencyType"
									value={formik.values.frequencyType}
									onChange={formik.handleChange}
									InputProps={{ sx: { borderRadius: "12px" } }}
								>
									<MenuItem value="daily">Diario</MenuItem>
									<MenuItem value="weekly">Semanal</MenuItem>
								</TextField>
							</Grid>
							<Grid size={{ xs: 6 }}>
								<TextField
									fullWidth
									type="number"
									label="Meta (veces)"
									name="goalTarget"
									value={formik.values.goalTarget}
									onChange={formik.handleChange}
									InputProps={{ sx: { borderRadius: "12px" } }}
								/>
							</Grid>
						</Grid>
					</Box>
				</DialogContent>
				<DialogActions sx={{ pb: 2, px: 3 }}>
					<Button onClick={handleClose} color="inherit" sx={{ borderRadius: "8px" }}>
						Cancelar
					</Button>
					<Button 
						type="submit" 
						variant="contained" 
						color="primary" 
						disableElevation
						sx={{ borderRadius: "8px", fontWeight: "bold" }}
					>
						Crear Hábito
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default CreateHabitModal;
