import React from "react";
import {
	Card,
	CardActionArea,
	CardContent,
	Typography,
	Box,
	Stack,
} from "@mui/material";
import { Habit } from "../../interfaces";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BookIcon from "@mui/icons-material/Book";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import LanguageIcon from "@mui/icons-material/Language";
import StarIcon from "@mui/icons-material/Star";

interface props {
	habits: Habit[];
	setSelectedHabit: React.Dispatch<React.SetStateAction<Habit | undefined>>;
}

const getIcon = (iconName: string | undefined) => {
	switch (iconName) {
		case "fitness": return <FitnessCenterIcon />;
		case "book": return <BookIcon />;
		case "water": return <WaterDropIcon />;
		case "food": return <RestaurantIcon />;
		case "meditation": return <SelfImprovementIcon />;
		case "work": return <WorkIcon />;
		case "code": return <CodeIcon />;
		case "language": return <LanguageIcon />;
		default: return <StarIcon />;
	}
};

const HabitsList = ({ habits, setSelectedHabit }: props) => {
	return (
		<Stack spacing={2}>
			{habits.map((habit) => (
				<Card 
					key={habit._id} 
					sx={{ 
						borderRadius: "16px", 
						boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
						transition: "transform 0.2s",
						"&:hover": { transform: "translateY(-2px)" }
					}}
				>
					<CardActionArea onClick={() => setSelectedHabit(habit)}>
						<CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
							<Box 
								sx={{ 
									p: 1.5, 
									borderRadius: "12px", 
									bgcolor: "primary.light", 
									color: "primary.main",
									display: "flex"
								}}
							>
								{getIcon(habit.icon)}
							</Box>
							<Box>
								<Typography variant="h6" fontWeight="bold">
									{habit.name}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{habit.streak} días racha
								</Typography>
							</Box>
						</CardContent>
					</CardActionArea>
				</Card>
			))}
		</Stack>
	);
};

export default HabitsList;
