import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
	Calendar,
	HabitInfo,
	HabitItem,
	HabitList,
} from "./styles/HabitsStyles";
import { Habit } from "../../interfaces";

interface props {
	habits: Habit[];
}
const HabitsList = ({ habits }: props) => {
	return (
		<HabitList>
			{habits.map((habit) => (
				<HabitItem key={habit._id}>
					<HabitInfo>
						<span>{habit.icon}</span>
						<div>
							<h3>{habit.name}</h3>
							<p>{habit.streak} días</p>
						</div>
					</HabitInfo>
					<Calendar>
						{/* {habit.daysChecked.map((checked, index) => (
							<div
								key={index}
								className={checked ? "checked" : "unchecked"}
							>
								{checked ? (
									<CheckIcon
										fontSize="small"
										color="inherit"
									/>
								) : (
									<CloseIcon
										fontSize="small"
										color="inherit"
									/>
								)}
							</div>
						))} */}
					</Calendar>
				</HabitItem>
			))}
		</HabitList>
	);
};

export default HabitsList;
