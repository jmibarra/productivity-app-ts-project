import React, { useEffect, useState } from "react";
import {
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { blue, grey, red, yellow } from "@mui/material/colors";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AcUnitIcon from "@mui/icons-material/AcUnit";

interface Props {
	priority: number | undefined;
	taskId: string;
	updatePriority: (id: string, newPriority: number) => void;
}

const Priority = ({ priority, taskId, updatePriority }: Props) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [currentPriority, setCurrentPriority] = useState(priority);

	useEffect(() => {
		// Sincronizar el estado interno con la prop cuando esta cambie
		setCurrentPriority(priority);
	}, [priority]);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSelectPriority = (newPriority: number) => {
		setCurrentPriority(newPriority);
		updatePriority(taskId, newPriority);
		handleClose();
	};

	return (
		<>
			<IconButton edge="end" onClick={handleOpen}>
				{(!currentPriority || currentPriority === 0) && (
					<QuestionMarkIcon sx={{ color: grey[500] }} />
				)}
				{currentPriority === 1 && (
					<PriorityHighIcon sx={{ color: red[500] }} />
				)}
				{currentPriority === 2 && (
					<LowPriorityIcon sx={{ color: yellow[500] }} />
				)}
				{currentPriority === 3 && (
					<AcUnitIcon sx={{ color: blue[500] }} />
				)}
			</IconButton>

			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "priority-menu",
				}}
			>
				<MenuItem onClick={() => handleSelectPriority(1)}>
					<ListItemIcon>
						<PriorityHighIcon sx={{ color: red[500] }} />
					</ListItemIcon>
					<ListItemText primary="High Priority" />
				</MenuItem>
				<MenuItem onClick={() => handleSelectPriority(2)}>
					<ListItemIcon>
						<LowPriorityIcon sx={{ color: yellow[500] }} />
					</ListItemIcon>
					<ListItemText primary="Medium Priority" />
				</MenuItem>
				<MenuItem onClick={() => handleSelectPriority(3)}>
					<ListItemIcon>
						<AcUnitIcon sx={{ color: blue[500] }} />
					</ListItemIcon>
					<ListItemText primary="Low Priority" />
				</MenuItem>
				<MenuItem onClick={() => handleSelectPriority(0)}>
					<ListItemIcon>
						<QuestionMarkIcon sx={{ color: grey[500] }} />
					</ListItemIcon>
					<ListItemText primary="Unset Priority" />
				</MenuItem>
			</Menu>
		</>
	);
};

export default Priority;
