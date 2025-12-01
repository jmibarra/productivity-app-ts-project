import * as React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
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
	Box,
	Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./shemas";

import { Note } from "../../../interfaces/notes";
import LabelsComponent from "../../common/Labels/LabelsComponent";
import ColorPickerComponent from "../../common/ColorPicker/ColorPickerComponent";

import { TransitionProps } from "@mui/material/transitions";

import shortid from "shortid";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
	addNote: (note: Note) => void;
	open: boolean;
	onClose: () => void;
}

export default function CreateNoteModalComponent({ addNote, open, onClose }: Props) {
	const [selectedColor, setSelectedColor] = React.useState("#ffee93");
	const [labels, setLabels] = React.useState<string[]>([]);
	const [content, setContent] = React.useState("");

	const handleContentChange = (value: string) => {
		setContent(value);
		formik.setFieldValue("content", value);
	};

	const handleClose = () => {
		onClose();
		formik.resetForm();
		setSelectedColor("#ffee93");
		setLabels([]);
		setContent("");
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
			_id: shortid.generate(),
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

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
				fullWidth
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
										(formik.errors.title as string)
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
											{formik.errors.content as string}
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
								<ColorPickerComponent
									selectedColor={selectedColor}
									setSelectedColor={setSelectedColor}
								/>
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
