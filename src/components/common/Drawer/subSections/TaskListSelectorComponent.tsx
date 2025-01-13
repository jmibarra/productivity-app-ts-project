import { useCallback, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Collapse,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
} from "@mui/material";
import {
	ExpandLess,
	ExpandMore,
	Inbox,
	TaskAlt,
	Add,
	AllInclusive,
	Delete,
	Close,
} from "@mui/icons-material";
import Cookies from "js-cookie";
import {
	createTaskList,
	deleteTaskList,
	fetchUserLists,
} from "../../../../services/taskListsServices";
import { TaskList } from "../../../../interfaces";
import { initialState, taskListsReducer } from "../../../../reducers/taksLists";
import { ReducerActionType } from "../../../../actions/tasksLists";
import ListCustomIconComponent from "./ListCustomIconComponent";

const TaskListSelectorComponent = () => {
	const [openSubsection, setOpenSubsection] = useState(false);
	const [sessionToken, setSessionToken] = useState<string | null>(null);
	const [showDeleteIcons, setShowDeleteIcons] = useState(false);
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
			name: "Nueva lista desde el boton con orden nuevo",
		};

		addList(newList);
	};

	const handleDeleteList = async (id: string) => {
		try {
			await deleteTaskList(id, sessionToken);
			dispatch({ type: ReducerActionType.DELETE_LIST, payload: id });
		} catch (error) {
			console.error("Error deleting list", error);
		}
	};

	const handleDeleteListsClick = () => {
		setShowDeleteIcons(!showDeleteIcons);
	};

	//Listas default para todos los usuarios, no se pueden eliminar o reordenar.
	const defaultLists: TaskList[] = [
		{
			_id: "0",
			name: "Buzón de entrada",
			icon: <Inbox fontSize="small" color="primary" />,
			order: 1,
		},
		{
			_id: "all-tasks",
			name: "Todas",
			icon: <AllInclusive fontSize="small" color="primary" />,
			order: 1000,
		},
	];

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
						<Box justifyContent="flex-end">
							<IconButton
								aria-label="create"
								size="small"
								onClick={handleNewListClick}
							>
								<Add fontSize="inherit" />
							</IconButton>
							{showDeleteIcons ? (
								<IconButton
									aria-label="delete"
									size="small"
									onClick={handleDeleteListsClick}
								>
									<Close fontSize="inherit" />
								</IconButton>
							) : (
								<IconButton
									aria-label="delete"
									size="small"
									onClick={handleDeleteListsClick}
								>
									<Delete fontSize="inherit" />
								</IconButton>
							)}
						</Box>
					</Box>
				</ListSubheader>
				<List component="div" disablePadding>
					{state.taskLists.map((list) => (
						<ListItem
							key={list._id}
							secondaryAction={
								showDeleteIcons ? (
									<IconButton
										aria-label="delete-list"
										size="small"
										onClick={() =>
											handleDeleteList(list._id)
										}
									>
										<Delete
											fontSize="small"
											color="error"
										/>
									</IconButton>
								) : null
							}
						>
							<ListItemButton
								key={list._id}
								onClick={() =>
									handleRouteClick(
										"/todos?listId=" + list._id
									)
								}
							>
								<ListCustomIconComponent listIcon={list.icon} />
								<ListItemText
									primary={list.name}
									primaryTypographyProps={{
										color: "primary",
										fontWeight: "medium",
										variant: "body2",
									}}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Collapse>
		</>
	);
};

export default TaskListSelectorComponent;
