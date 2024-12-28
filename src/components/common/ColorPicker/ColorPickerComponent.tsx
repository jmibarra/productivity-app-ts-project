import { Box, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
	selectedColor: string;
	setSelectedColor: (color: string) => void;
}

const ColorPickerComponent = ({ selectedColor, setSelectedColor }: Props) => {
	const [colorPickerOpen, setColorPickerOpen] = useState(false);

	const colorOptions = [
		"#79addc",
		"#ffc09f",
		"#ffee93",
		"#fcf5c7",
		"#adf7b6",
	];
	const toggleColorPicker = () => {
		setColorPickerOpen(!colorPickerOpen);
	};

	const selectColor = (color: string) => {
		setSelectedColor(color);
		setColorPickerOpen(false);
	};
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				gap: 2,
			}}
		>
			<Typography variant="subtitle1">Color</Typography>
			<Box
				onClick={toggleColorPicker}
				sx={{
					width: 32,
					height: 32,
					borderRadius: "50%",
					backgroundColor: selectedColor,
					cursor: "pointer",
					boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)",
				}}
			/>
			{colorPickerOpen && (
				<Box sx={{ display: "flex", gap: 1 }}>
					{colorOptions.map((color) => (
						<Box
							key={color}
							onClick={() => selectColor(color)}
							sx={{
								width: 32,
								height: 32,
								borderRadius: "50%",
								backgroundColor: color,
								cursor: "pointer",
								border:
									color === selectedColor
										? "2px solid #6200ea"
										: "none",
							}}
						/>
					))}
				</Box>
			)}
		</Box>
	);
};

export default ColorPickerComponent;
