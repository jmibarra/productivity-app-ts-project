import { useCallback, useEffect, useReducer, useState } from "react";
import { ReducerActionType } from "../../actions/tasks";
import { tasksReducer, initialState } from "../../reducers/tasks";
import { Task } from "../../interfaces";
import TaskForm from "./taskForm/TaskForm";
import TaskList from "./TaskList";
import Pagination from "@mui/material/Pagination";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import {
	Container,
	Content,
	FabContainer,
	Footer,
	Header,
} from "./styles/TasksStyles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TaskQuickInputComponent from "./TaskQuickInput";
import Cookies from "js-cookie";
import { Box, CircularProgress, ListItemText, TextField } from "@mui/material";
import { ItemLoading } from "../notes/styles/NotesStyles";
import FilterAndSortComponent from "./FilterAndSortComponent";
import {
	createTask,
	deleteTaskById,
	fetchTasks,
	patchTask,
} from "../../services/tasksServices";
import { useSearchParams } from "react-router-dom";
import ListCustomIconComponent from "../common/Drawer/Sections/TaskLists/ListCustomIconComponent";

const Tasks = () => {
	const [loading, setLoading] = useState(false);
	const [state, dispatch] = useReducer(tasksReducer, initialState);
	const [taskFormModalOpen, settaskFormModalOpen] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [sessionToken, setSessionToken] = useState<string | null>(null);
	const [showCompleted, setShowCompleted] = useState(false);
	const [sortOption, setSortOption] = useState("createdAt");
	const [sortDirection, setSortDirection] = useState("desc");

	const [searchParams] = useSearchParams(); // Hook para manejar query strings
	const listIdFromUrl = searchParams.get("listId"); // Obtén el valor de 'listId'

	const [listId, setListId] = useState<string | null>(listIdFromUrl || ""); // Estado para guardar listId

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
	};

	const fetchAllTasks = useCallback(
		async (
			page: number,
			limit: number,
			sortOption: string,
			sortDirection: string,
			listId: string | null
		) => {
			setLoading(true);
			try {
				const responseJson = await fetchTasks(
					page,
					limit,
					sortOption,
					sortDirection,
					sessionToken,
					listId
				);
				dispatch({
					type: ReducerActionType.GET_ALL_TASKS,
					payload: responseJson.tasks,
				});
				if (responseJson.count > 0) {
					setTotalPages(Math.ceil(responseJson.count / limit));
				}
			} catch (error) {
				console.error("Error fetching tasks", error);
			} finally {
				setLoading(false);
			}
		},
		[sessionToken]
	);

	const addTask = async (task: Task): Promise<void> => {
		try {
			const createdTask = await createTask(task, sessionToken);
			dispatch({
				type: ReducerActionType.SET_TASK,
				payload: createdTask,
			});
		} catch (response) {
			console.log("Error", response);
		}
	};

	const deleteTask = async (id: string) => {
		try {
			await deleteTaskById(id, sessionToken);
			dispatch({ type: ReducerActionType.DELETE_TASK, payload: id });
		} catch (error) {
			console.error("Error deleting note", error);
		}
	};

	const toogleTask = (id: string, completed: boolean): void => {
		try {
			dispatch({ type: ReducerActionType.COMPLETE_TASK, payload: id });
			const data = { completed: !completed };
			patchTask(id, data, sessionToken);
		} catch (response) {
			console.log("Error", response);
		}
	};

	const updateLabels = (id: string, labels: string[]): void => {
		try {
			dispatch({
				type: ReducerActionType.UPDATE_TASK_LABELS,
				payload: { labels: labels, id: id },
			});
			const data = { labels: labels };
			patchTask(id, data, sessionToken);
		} catch (response) {
			console.log("Error", response);
		}
	};

	const updatePriority = (id: string, priority: Number): void => {
		try {
			dispatch({
				type: ReducerActionType.UPDATE_TASK_PRIORITY,
				payload: { priority: priority, id: id },
			});
			const data = { priority: priority };
			patchTask(id, data, sessionToken);
		} catch (response) {
			console.log("Error", response);
		}
	};

	const updateDueDate = (id: string, dueDate: String): void => {
		try {
			dispatch({
				type: ReducerActionType.UPDATE_TASK_PRIORITY,
				payload: { dueDate: dueDate, id: id },
			});
			const data = { dueDate: dueDate };
			patchTask(id, data, sessionToken);
		} catch (response) {
			console.log("Error", response);
		}
	};

	const getFilteredAndSortedTasks = () => {
		let filteredTasks = state.tasks;

		// Filtrar tareas según los criterios
		if (!showCompleted) {
			filteredTasks = filteredTasks.filter(
				(task: Task) => !task.completed
			);
		}

		return filteredTasks;
	};

	// Actualizar listId cuando el parámetro de la URL cambie
	useEffect(() => {
		if (listIdFromUrl) {
			setListId(listIdFromUrl);
		}
	}, [listIdFromUrl]);

	useEffect(() => {
		const token = Cookies.get("PROD-APP-AUTH");
		if (token) {
			setSessionToken(token);
			fetchAllTasks(page, 10, sortOption, sortDirection, listId);
		}
	}, [fetchAllTasks, page, sortOption, sortDirection, listId]);

	return (
		<Container>
			<Header>
				<h1>
					<TaskAltIcon /> Tareas
				</h1>
			</Header>
			<Content>
				<Box
					display="flex"
					justifyContent="flex-end"
					alignItems="center"
					gap={1}
				>
					<Box
						display="flex"
						justifyContent="space-between"
						width="100%"
					>
						<Box
							display="flex"
							alignItems="center"
							justifyContent={"center"}
						>
							<ListCustomIconComponent listIcon="Inbox" />
							<ListItemText
								primary="Lista"
								primaryTypographyProps={{
									color: "primary",
									fontWeight: "medium",
									variant: "body2",
								}}
							/>
						</Box>
					</Box>
					<FilterAndSortComponent
						showCompleted={showCompleted}
						setShowCompleted={setShowCompleted}
						setSortOption={setSortOption}
						sortDirection={sortDirection}
						setSortDirection={setSortDirection}
					/>
				</Box>
				<TaskQuickInputComponent addTask={addTask} />
				{loading ? (
					<ItemLoading>
						<CircularProgress />
					</ItemLoading>
				) : (
					<TaskList
						tasks={getFilteredAndSortedTasks()}
						deleteTask={deleteTask}
						toogleTask={toogleTask}
						updateLabels={updateLabels}
						updatePriority={updatePriority}
						updateDueDate={updateDueDate}
					/>
				)}
			</Content>
			<Footer>
				<Pagination
					count={totalPages}
					page={page}
					onChange={handlePageChange}
					variant="outlined"
					color="primary"
				/>
			</Footer>
			<FabContainer>
				<Fab
					color="primary"
					aria-label="add"
					onClick={() => settaskFormModalOpen(true)}
				>
					<AddIcon />
				</Fab>
			</FabContainer>
			<TaskForm
				addTask={addTask}
				handleCloseModal={() => settaskFormModalOpen(false)}
				taskModalOpen={taskFormModalOpen}
			/>
		</Container>
	);
};

export default Tasks;
