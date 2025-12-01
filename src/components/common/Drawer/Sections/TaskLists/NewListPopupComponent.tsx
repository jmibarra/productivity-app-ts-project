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
	Typography,
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
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth="xs"
			PaperProps={{
				style: { borderRadius: 16, padding: "16px" },
			}}
		>
			<DialogTitle sx={{ textAlign: "center", fontWeight: "bold", pb: 1 }}>
				Crear Nueva Lista
			</DialogTitle>
			<DialogContent>
				<Box display="flex" flexDirection="column" gap={3} mt={1}>
					<TextField
						label="Nombre de la Lista"
						variant="outlined"
						fullWidth
						value={name}
						onChange={(e) => setName(e.target.value)}
						InputProps={{
							style: { borderRadius: 12 },
						}}
					/>
					<Box>
						<Typography
							variant="subtitle2"
							color="text.secondary"
							sx={{ mb: 2, fontWeight: "bold" }}
						>
							Seleccionar Ícono
						</Typography>
						<Grid container spacing={2} justifyContent="center">
							{Object.keys(listIconsMap).map((key) => (
								<Grid key={key}>
									<IconButton
										onClick={() => setSelectedIcon(key)}
										sx={{
											width: 48,
											height: 48,
											border:
												selectedIcon === key
													? "2px solid #1976d2"
													: "1px solid transparent",
											backgroundColor:
												selectedIcon === key
													? "rgba(25, 118, 210, 0.08)"
													: "rgba(0, 0, 0, 0.02)",
											borderRadius: "12px",
											transition: "all 0.2s",
											color:
												selectedIcon === key
													? "primary.main"
													: "text.secondary",
											"&:hover": {
												backgroundColor:
													selectedIcon === key
														? "rgba(25, 118, 210, 0.12)"
														: "rgba(0, 0, 0, 0.05)",
												transform: "translateY(-2px)",
											},
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
			<DialogActions sx={{ justifyContent: "center", pb: 2, gap: 2 }}>
				<Button
					onClick={onClose}
					color="inherit"
					sx={{ borderRadius: "8px", textTransform: "none" }}
				>
					Cancelar
				</Button>
				<Button
					onClick={handleAddList}
					color="primary"
					variant="contained"
					disableElevation
					sx={{
						borderRadius: "8px",
						textTransform: "none",
						px: 4,
						fontWeight: "bold",
					}}
				>
					Crear Lista
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default NewListPopup;
