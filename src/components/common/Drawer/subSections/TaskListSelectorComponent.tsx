import React from "react";
import { useNavigate } from "react-router-dom";
import {
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";

const TaskListSelectorComponent = () => {
	const [openSubsection, setOpenSubsection] = React.useState(false);

	const navigate = useNavigate();
	const handleClick = () => {
		setOpenSubsection(!openSubsection);
	};

	const handleRouteClick = (route: string) => {
		navigate(route);
	};
	return (
		<>
			<ListItemButton onClick={handleClick}>
				<ListItemIcon>
					<TaskAltIcon />
				</ListItemIcon>
				<ListItemText primary="Tareas" />
				{openSubsection ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={openSubsection} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItemButton
						sx={{ pl: 4 }}
						key="all-tasks-list"
						onClick={() => handleRouteClick("/todos")}
					>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Todas" />
					</ListItemButton>
				</List>
			</Collapse>
		</>
	);
};

export default TaskListSelectorComponent;
