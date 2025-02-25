import { useCallback, useEffect, useReducer, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore, TaskAlt } from "@mui/icons-material";
import {
	createTaskList,
	deleteTaskList,
	fetchUserLists,
} from "../../../../../services/taskListsServices";
import { TaskList } from "../../../../../interfaces";
import {
	initialState,
	taskListsReducer,
} from "../../../../../reducers/taksLists";
import { ReducerTaskListActionType } from "../../../../../actions/tasksLists";
import TaskListItem from "./TaskListItem";
import ListAdministrationBarComponent from "./ListAdministrationBarComponent";
import NewListPopup from "./NewListPopupComponent";

const TaskListSelectorComponent = () => {
	const [searchParams] = useSearchParams(); // Hook para manejar query strings
	const listIdFromUrl = searchParams.get("listId"); // Obtén el valor de 'listId'

	const [listId, setListId] = useState<string | null>(listIdFromUrl || "");
	const [openSubsection, setOpenSubsection] = useState(false);
	const [showDeleteIcons, setShowDeleteIcons] = useState(false);
	const [state, dispatch] = useReducer(taskListsReducer, initialState);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const navigate = useNavigate();

	const handleRouteClick = (route: string) => {
		navigate(route);
	};

	// Actualizar listId cuando el parámetro de la URL cambie
	useEffect(() => {
		if (listIdFromUrl) {
			setListId(listIdFromUrl);
		}
	}, [listIdFromUrl]);

	const addList = async (taskList: TaskList): Promise<void> => {
		try {
			const createdList = await createTaskList(taskList);
			dispatch({
				type: ReducerTaskListActionType.CREATE_LIST,
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
		setIsPopupOpen(true);
	};

	const handleClosePopup = () => {
		setIsPopupOpen(false);
	};

	const handleDeleteList = async (id: string) => {
		try {
			await deleteTaskList(id);
			dispatch({
				type: ReducerTaskListActionType.DELETE_LIST,
				payload: id,
			});
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
			_id: "all-tasks",
			name: "Todas",
			icon: "All",
			order: 99999,
		},
	];

	const fetchAllLists = useCallback(async () => {
		try {
			const responseJson = await fetchUserLists();
			dispatch({
				type: ReducerTaskListActionType.GET_USER_LISTS,
				payload: responseJson,
			});
		} catch (error) {
			console.error("Error fetching lists", error);
		}
	}, []);

	useEffect(() => {
		fetchAllLists();
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
				<ListAdministrationBarComponent
					showDeleteIcons={showDeleteIcons}
					handleNewListClick={handleNewListClick}
					handleDeleteListsClick={handleDeleteListsClick}
				/>
				<List component="div" disablePadding key="task-lists" dense>
					{state.taskLists.map((list) => (
						<TaskListItem
							list={list}
							key={list._id}
							showDeleteIcons={showDeleteIcons}
							handleRouteClick={handleRouteClick}
							handleDeleteList={handleDeleteList}
							selectdListId={listId}
						/>
					))}
					<TaskListItem
						list={defaultLists[0]}
						key={defaultLists[0]._id}
						showDeleteIcons={false}
						handleRouteClick={handleRouteClick}
						handleDeleteList={handleDeleteList}
						selectdListId={listId}
					/>
				</List>
			</Collapse>
			<NewListPopup
				open={isPopupOpen}
				onClose={handleClosePopup}
				onAddList={addList}
			/>
		</>
	);
};

export default TaskListSelectorComponent;
