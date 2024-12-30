import { Box } from "@mui/material";

const HorizontalDivider = () => {
	return (
		<Box
			sx={{
				borderLeft: "1px solid #E0E0E0", // Color del separador
				height: "24px", // Altura del separador
				marginX: 1, // Espaciado horizontal alrededor del separador
			}}
		/>
	);
};

export default HorizontalDivider;
