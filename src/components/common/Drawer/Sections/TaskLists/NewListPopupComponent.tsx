import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Box,
	Grid,
	IconButton,
} from "@mui/material";
import { listIconsMap } from "./ListCustomIconComponent";

interface NewListPopupProps {
	open: boolean;
	onClose: () => void;
	onAddList: (list: {
		_id: string;
		name: string;
		icon: string;
		order: number;
	}) => void;
}

const NewListPopup: React.FC<NewListPopupProps> = ({
	open,
	onClose,
	onAddList,
}) => {
	const [name, setName] = useState("");
	const [selectedIcon, setSelectedIcon] = useState<string>("");

	const handleAddList = () => {
		if (!name || !selectedIcon)
			return alert("Por favor, completa todos los campos.");

		const newList = {
			_id: "", // Genera un ID si es necesario
			name,
			icon: selectedIcon,
			order: 99999,
		};

		onAddList(newList);
		setName("");
		setSelectedIcon("");
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle>Crear Nueva Lista</DialogTitle>
			<DialogContent>
				<Box display="flex" flexDirection="column" gap={2}>
					<TextField
						label="Nombre de la Lista"
						variant="outlined"
						fullWidth
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Box>
						<h4>Seleccionar Ícono</h4>
						<Grid spacing={2}>
							{Object.keys(listIconsMap).map((key) => (
								<Grid key={key}>
									<IconButton
										onClick={() => setSelectedIcon(key)}
										sx={{
											border:
												selectedIcon === key
													? "2px solid #1976d2"
													: "none",
											backgroundColor:
												selectedIcon === key
													? "#e3f2fd"
													: "transparent",
											borderRadius: "8px",
										}}
									>
										{listIconsMap[key]}
									</IconButton>
								</Grid>
							))}
						</Grid>
					</Box>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="secondary">
					Cancelar
				</Button>
				<Button
					onClick={handleAddList}
					color="primary"
					variant="contained"
				>
					Agregar Lista
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default NewListPopup;
