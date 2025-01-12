import { useCallback, useEffect, useReducer, useState } from "react";
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
import Cookies from "js-cookie";
import {
	createTaskList,
	fetchUserLists,
} from "../../../../services/taskListsServices";
import { TaskList } from "../../../../interfaces";
import { initialState, taskListsReducer } from "../../../../reducers/taksLists";
import { ReducerActionType } from "../../../../actions/tasksLists";

const TaskListSelectorComponent = () => {
	const [openSubsection, setOpenSubsection] = useState(false);
	const [sessionToken, setSessionToken] = useState<string | null>(null);
	const [state, dispatch] = useReducer(taskListsReducer, initialState);
	const navigate = useNavigate();

	const handleRouteClick = (route: string) => {
		navigate(route);
	};

	const addList = async (taskList: TaskList): Promise<void> => {
		try {
			const createdList = await createTaskList(taskList, sessionToken);
			dispatch({
				type: ReducerActionType.CREATE_LIST,
				payload: createdList,
			});
		} catch (response) {
			console.log("Error", response);
		}
	};

	const handleClick = () => {
		setOpenSubsection(!openSubsection);
	};

	const handleNewListClick = () => {
		const newList: TaskList = {
			_id: "",
			name: "Nueva lista desde el boton",
		};

		addList(newList);
	};

	//Listas default para todos los usuarios, no se pueden eliminar o reordenar.
	const defaultLists: TaskList[] = [
		{
			_id: "0",
			name: "Buzón de entrada",
			icon: <Inbox />,
			order: 0,
		},
		{
			_id: "all-tasks",
			name: "Todas",
			icon: <AllInclusive />,
			order: 1000,
		},
	];
	//TODO: Traer estas listas desde la API
	const availableLists: TaskList[] = [
		{
			_id: "1",
			name: "Personal",
			icon: <Person />,
			order: 1,
		},
		{
			_id: "2",
			name: "Favoritas",
			icon: <StarBorder />,
			order: 2,
		},
		{
			_id: "3",
			name: "Trabajo",
			icon: <BusinessCenter />,
			order: 3,
		},
	];

	//Concateno las dos listas y las ordeno por el atributo orden

	const fetchAllLists = useCallback(async () => {
		try {
			const responseJson = await fetchUserLists(sessionToken);
			dispatch({
				type: ReducerActionType.GET_USER_LISTS,
				payload: responseJson,
			});
		} catch (error) {
			console.error("Error fetching lists", error);
		}
	}, [sessionToken]);

	useEffect(() => {
		const token = Cookies.get("PROD-APP-AUTH");
		if (token) {
			setSessionToken(token);
			fetchAllLists();
		}
	}, [fetchAllLists]);

	const allLists = [
		...defaultLists,
		...availableLists,
		...state.taskLists,
	].sort((a, b) => (a.order ? a.order : 999) - (b.order ? b.order : 999));

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
							key={list._id}
							sx={{ pl: 4 }}
							onClick={() =>
								handleRouteClick("/todos?listId=" + list._id)
							}
						>
							{list.icon && (
								<ListItemIcon>{list.icon}</ListItemIcon>
							)}
							<ListItemText primary={list.name} />
						</ListItemButton>
					))}
				</List>
			</Collapse>
		</>
	);
};

export default TaskListSelectorComponent;
