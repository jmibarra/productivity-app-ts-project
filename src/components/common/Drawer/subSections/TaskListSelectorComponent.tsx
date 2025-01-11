import React from "react";
import { useNavigate } from "react-router-dom";
import {
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import {
	ExpandLess,
	ExpandMore,
	StarBorder,
	AllInclusive,
	TaskAlt,
	BusinessCenter,
} from "@mui/icons-material";

const TaskListSelectorComponent = () => {
	const [openSubsection, setOpenSubsection] = React.useState(false);

	const navigate = useNavigate();
	const handleClick = () => {
		setOpenSubsection(!openSubsection);
	};

	const handleRouteClick = (route: string) => {
		navigate(route);
	};

	//TODO: Aca debo traer todas las listas que haya y armar un mapa para que se desplieguen con la accion y el ícono que corresponda
	const availableLists = [
		{
			id: 1,
			name: "Todas",
			icon: <AllInclusive />,
		},
		{
			id: 2,
			name: "Favoritas",
			icon: <StarBorder />,
		},
		{
			id: 3,
			name: "Trabajo",
			icon: <BusinessCenter />,
		},
	];
	return (
		<>
			<ListItemButton onClick={handleClick}>
				<ListItemIcon>
					<TaskAlt />
				</ListItemIcon>
				<ListItemText primary="Tareas" />
				{openSubsection ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={openSubsection} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{availableLists.map((list) => (
						<ListItemButton
							key={list.id}
							sx={{ pl: 4 }}
							onClick={() =>
								handleRouteClick("/todos?listId=" + list.id)
							}
						>
							<ListItemIcon>{list.icon}</ListItemIcon>
							<ListItemText primary={list.name} />
						</ListItemButton>
					))}
				</List>
			</Collapse>
		</>
	);
};

export default TaskListSelectorComponent;
