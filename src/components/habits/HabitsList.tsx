import React from "react";
import {
	Calendar,
	HabitInfo,
	HabitItem,
	HabitList,
} from "./styles/HabitsStyles";
import { Habit } from "../../interfaces";
import HabitWeekRecords from "./records/HabitWeekRecords";

interface props {
	habits: Habit[];
	setSelectedHabit: React.Dispatch<React.SetStateAction<Habit | undefined>>;
}
const HabitsList = ({ habits, setSelectedHabit }: props) => {
	return (
		<HabitList>
			{habits.map((habit) => (
				<HabitItem key={habit._id}>
					<HabitInfo onClick={() => setSelectedHabit(habit)}>
						<span>{habit.icon}</span>
						<div>
							<h3>{habit.name}</h3>
							<p>5 días</p>
						</div>
					</HabitInfo>
					<Calendar>
						{habit._id && <HabitWeekRecords habitId={habit._id} />}
					</Calendar>
				</HabitItem>
			))}
		</HabitList>
	);
};

export default HabitsList;
