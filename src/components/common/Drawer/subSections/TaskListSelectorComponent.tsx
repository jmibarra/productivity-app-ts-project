import React from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Collapse,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
} from "@mui/material";
import {
	ExpandLess,
	ExpandMore,
	StarBorder,
	AllInclusive,
	TaskAlt,
	BusinessCenter,
	Add,
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

	const handleNewListClick = () => {
		alert("Creo la nueva lista");
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
				<ListSubheader>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between"
					>
						Mis listas
						<IconButton
							aria-label="delete"
							size="small"
							onClick={handleNewListClick}
						>
							<Add fontSize="inherit" />
						</IconButton>
					</Box>
				</ListSubheader>
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
