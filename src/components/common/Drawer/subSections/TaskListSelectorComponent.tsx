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
	Inbox,
	TaskAlt,
	BusinessCenter,
	Add,
	Person,
	AllInclusive,
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

	//Listas default para todos los usuarios, no se pueden eliminar o reordenar.
	const defaultLists = [
		{
			id: "main-drawer",
			name: "Buzón de entrada",
			icon: <Inbox />,
			order: 0,
		},
		{
			id: "all-tasks",
			name: "Todas",
			icon: <AllInclusive />,
			order: 1000,
		},
	];
	//TODO: Traer estas listas desde la API
	const availableLists = [
		{
			id: 1,
			name: "Personal",
			icon: <Person />,
			order: 1,
		},
		{
			id: 2,
			name: "Favoritas",
			icon: <StarBorder />,
			order: 2,
		},
		{
			id: 3,
			name: "Trabajo",
			icon: <BusinessCenter />,
			order: 3,
		},
	];

	//Concateno las dos listas y las ordeno por el atributo orden
	const allLists = [...defaultLists, ...availableLists].sort(
		(a, b) => a.order - b.order
	);

	return (
		<>
			<ListItemButton onClick={handleClick} key="task-list-selector">
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
					{allLists.map((list) => (
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
