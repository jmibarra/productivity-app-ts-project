import { useState } from "react";
import Chip from "@mui/material/Chip";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

interface Props {
	labels: string[];
	taskId: string;
	updateLabels: (id: string, labels: string[]) => void;
}

const LabelsComponent = ({ labels, taskId, updateLabels }: Props) => {
	const [chips, setChips] = useState<string[]>(labels);
	const [inputValue, setInputValue] = useState("");

	const handleDelete = (index: number) => {
		let newChips = chips.filter((_, i) => i !== index);
		setChips(newChips);
		updateLabels(taskId, newChips);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			const newLabel = inputValue.trim();
			if (newLabel !== "") {
				setChips([...chips, newLabel]);
				updateLabels(taskId, [...chips, newLabel]);
				setInputValue("");
			}
		}
	};

	return (
		<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, alignItems: "center", mt: 1 }}>
			{chips.map((data: string, index: number) => {
				return (
					<Chip
						key={index}
						label={data}
						onDelete={() => handleDelete(index)}
						size="small"
						variant="outlined"
						sx={{
							borderRadius: "8px",
							borderColor: "rgba(0, 0, 0, 0.12)",
							backgroundColor: "rgba(0, 0, 0, 0.02)",
							fontSize: "0.75rem",
							height: "24px",
							"& .MuiChip-deleteIcon": {
								fontSize: "14px",
								color: "rgba(0, 0, 0, 0.26)",
								"&:hover": {
									color: "rgba(0, 0, 0, 0.4)",
								},
							},
						}}
					/>
				);
			})}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					backgroundColor: "rgba(0, 0, 0, 0.04)",
					borderRadius: "8px",
					padding: "0 8px",
					height: "24px",
					transition: "background-color 0.2s",
					"&:hover": {
						backgroundColor: "rgba(0, 0, 0, 0.08)",
					},
				}}
			>
				<LocalOfferIcon sx={{ fontSize: 14, color: "text.secondary", mr: 0.5 }} />
				<Input
					disableUnderline
					name="labels"
					placeholder="Add label"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					sx={{
						fontSize: "0.75rem",
						width: "60px",
						"& input": {
							padding: 0,
						},
						"& input::placeholder": {
							fontSize: "0.75rem",
						},
					}}
				/>
			</Box>
		</Box>
	);
};

export default LabelsComponent;
