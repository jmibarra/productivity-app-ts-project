import React from "react";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { blue, grey, red, yellow } from "@mui/material/colors";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { IconButton } from "@mui/material";

interface Props {
	priority: Number | undefined;
	taskId: string;
	updatePriority: (id: string, newPriority: number) => void;
}

const Priority = ({ priority, taskId }: Props) => {
	return (
		<IconButton
			edge="end"
			aria-label="delete-action"
			onClick={() => {
				alert(taskId);
			}}
		>
			{!priority && <QuestionMarkIcon sx={{ color: grey[500] }} />}
			{priority === 1 && <PriorityHighIcon sx={{ color: red[500] }} />}
			{priority === 2 && <LowPriorityIcon sx={{ color: yellow[500] }} />}
			{priority === 3 && <AcUnitIcon sx={{ color: blue[500] }} />}
		</IconButton>
	);
};

export default Priority;
