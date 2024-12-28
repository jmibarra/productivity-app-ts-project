import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
	AppBar,
	Button,
	Dialog,
	IconButton,
	List,
	ListItem,
	TextField,
	Toolbar,
	Typography,
	Slide,
	Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./shemas";

import { Note } from "../../../interfaces/tasks/interfaces";
import LabelsComponent from "../../common/Labels/LabelsComponent";

interface Props {
	addNote: (note: Note) => void;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const colorOptions = ["#79addc", "#ffc09f", "#ffee93", "#fcf5c7", "#adf7b6"];

export default function CreateNoteModalComponent({ addNote }: Props) {
	const [open, setOpen] = React.useState(false);
	const [selectedColor, setSelectedColor] = React.useState(colorOptions[0]); // Color inicial
	const [colorPickerOpen, setColorPickerOpen] = React.useState(false);
	const [labels, setLabels] = React.useState<string[]>([]);
	const [content, setContent] = React.useState("");

	const handleContentChange = (value: string) => {
		setContent(value);
		formik.setFieldValue("content", value);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setColorPickerOpen(false);
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (object: any) => {
			createNote(object);
		},
	});

	const createNote = (object: any) => {
		let note: Note = {
			...object,
			createdAt: new Date(),
			favorite: false,
			color: selectedColor,
			labels: labels,
		};
		addNote(note);
		setLabels([]);
		handleClose();
	};

	const updateLabels = (id: string, labels: string[]): void => {
		setLabels(labels);
	};

	const toggleColorPicker = () => {
		setColorPickerOpen(!colorPickerOpen);
	};

	const selectColor = (color: string) => {
		setSelectedColor(color);
		setColorPickerOpen(false);
	};

	return (
		<div>
			<Button variant="contained" onClick={handleClickOpen}>
				Nueva nota
			</Button>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<form onSubmit={formik.handleSubmit}>
					<AppBar
						position="sticky"
						sx={{ backgroundColor: "#6200ea" }}
					>
						<Toolbar>
							<IconButton
								edge="start"
								color="inherit"
								onClick={handleClose}
								aria-label="close"
							>
								<CloseIcon />
							</IconButton>
							<Typography
								sx={{ ml: 2, flex: 1 }}
								variant="h6"
								component="div"
							>
								Nueva nota
							</Typography>
							<Button
								type="submit"
								autoFocus
								color="inherit"
								disabled={!formik.isValid}
							>
								Crear
							</Button>
						</Toolbar>
					</AppBar>
					<Box sx={{ p: 3 }}>
						<List sx={{ gap: 3 }}>
							<ListItem
								sx={{
									flexDirection: "column",
									alignItems: "flex-start",
								}}
							>
								<Typography variant="subtitle1" sx={{ mb: 1 }}>
									Título
								</Typography>
								<TextField
									type="text"
									fullWidth
									variant="outlined"
									name="title"
									placeholder="Título"
									onChange={formik.handleChange}
									error={
										formik.touched.title &&
										Boolean(formik.errors.title)
									}
									helperText={
										formik.touched.title &&
										formik.errors.title
									}
								/>
							</ListItem>
							<ListItem
								sx={{
									flexDirection: "column",
									alignItems: "flex-start",
								}}
							>
								<Typography variant="subtitle1" sx={{ mb: 1 }}>
									Contenido
								</Typography>
								<ReactQuill
									value={content}
									onChange={handleContentChange}
									placeholder="Escribe aquí el contenido de tu nota..."
									theme="snow"
									style={{
										width: "100%",
										minHeight: "150px",
									}}
								/>
								{formik.touched.content &&
									formik.errors.content && (
										<Typography
											variant="caption"
											color="error"
											sx={{ mt: 1 }}
										>
											{formik.errors.content}
										</Typography>
									)}
							</ListItem>
							<ListItem
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									gap: 3,
								}}
							>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										gap: 2,
									}}
								>
									<Typography variant="subtitle1">
										Color
									</Typography>
									<Box
										onClick={toggleColorPicker}
										sx={{
											width: 32,
											height: 32,
											borderRadius: "50%",
											backgroundColor: selectedColor,
											cursor: "pointer",
											boxShadow:
												"0 0 4px rgba(0, 0, 0, 0.3)",
										}}
									/>
									{colorPickerOpen && (
										<Box sx={{ display: "flex", gap: 1 }}>
											{colorOptions.map((color) => (
												<Box
													key={color}
													onClick={() =>
														selectColor(color)
													}
													sx={{
														width: 32,
														height: 32,
														borderRadius: "50%",
														backgroundColor: color,
														cursor: "pointer",
														border:
															color ===
															selectedColor
																? "2px solid #6200ea"
																: "none",
													}}
												/>
											))}
										</Box>
									)}
								</Box>
								<div
									style={{
										display: "flex",
										justifyContent: "flex-end", // Alinea el selector de etiquetas a la derecha
										marginTop: "8px", // Espaciado superior opcional
									}}
								>
									<LabelsComponent
										labels={labels}
										taskId=""
										updateLabels={updateLabels}
									/>
								</div>
							</ListItem>
						</List>
					</Box>
				</form>
			</Dialog>
		</div>
	);
}
