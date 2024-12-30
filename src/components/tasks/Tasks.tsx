import { useCallback, useEffect, useReducer, useState } from "react";
import { ReducerActionType } from "../../actions/tasks";
import { tasksReducer, initialState } from "../../reducers/tasks";
import { Task } from "../../interfaces/tasks/interfaces";
import { properties } from "../../properties";
import TaskForm from "./taskForm/TaskForm";
import TaskList from "./TaskList";
import Pagination from "@mui/material/Pagination";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SwapVertIcon from "@mui/icons-material/SwapVert";

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
import {
	Box,
	IconButton,
	Menu,
	MenuItem,
	Switch,
	Tooltip,
} from "@mui/material";

interface HeadersInit {
	headers: Headers;
	credentials: RequestCredentials;
}

const Tasks = () => {
	const [state, dispatch] = useReducer(tasksReducer, initialState);
	const [taskFormModalOpen, settaskFormModalOpen] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [sessionToken, setSessionToken] = useState<string | null>(null);
	const [filterMenuAnchor, setFilterMenuAnchor] =
		useState<null | HTMLElement>(null);
	const [sortMenuAnchor, setSortMenuAnchor] = useState<null | HTMLElement>(
		null
	);
	const [showCompleted, setShowCompleted] = useState(true);

	const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
		setFilterMenuAnchor(event.currentTarget);
	};

	const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
		setSortMenuAnchor(event.currentTarget);
	};

	const handleFilterClose = () => {
		setFilterMenuAnchor(null);
	};

	const handleSortClose = () => {
		setSortMenuAnchor(null);
	};

	const applyFilter = (filterType: string) => {
		console.log(`Applying filter: ${filterType}`);
	};

	const applySort = (sortType: string) => {
		console.log(`Applying sort: ${sortType}`);
		handleSortClose();
	};

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
	};

	const fetchAllTasks = useCallback(
		async (page: number, limit: number) => {
			try {
				const headers = new Headers() as HeadersInit["headers"];
				headers.append("Cookie", `PROD-APP-AUTH=${sessionToken}`);

				fetch(
					properties.api_url +
						"/tasks?page=" +
						page +
						"&limit=" +
						limit,
					{
						headers,
						credentials: "include",
					}
				)
					.then((response) => response.json())
					.then((responseJson) => {
						dispatch({
							type: ReducerActionType.GET_ALL_TASKS,
							payload: responseJson.tasks,
						});
						if (responseJson.count > 0) {
							setTotalPages(
								Math.trunc(responseJson.count / limit) + 1
							);
						}
					});
			} catch (response) {
				console.log("Error", response);
			}
		},
		[sessionToken]
	);

	const addTask = async (task: Task): Promise<void> => {
		try {
			const headers = new Headers() as HeadersInit["headers"];
			headers.append("Cookie", `PROD-APP-AUTH=${sessionToken}`);
			headers.append("Content-Type", "application/json");

			const response = await fetch(properties.api_url + "/tasks", {
				method: "POST",
				headers,
				credentials: "include",
				body: JSON.stringify(task),
			});

			if (!response.ok) {
				console.log("Error", response);
				return;
			}

			const responseJson = await response.json();
			const createdTask: Task = responseJson;

			dispatch({
				type: ReducerActionType.SET_TASK,
				payload: createdTask,
			});
		} catch (response) {
			console.log("Error", response);
		}
	};

	const deleteTask = (id: string): void => {
		try {
			const headers = new Headers() as HeadersInit["headers"];
			headers.append("Cookie", `PROD-APP-AUTH=${sessionToken}`);
			headers.append("Content-Type", "application/json");

			fetch(properties.api_url + "/tasks/" + id, {
				method: "DELETE",
				headers,
				credentials: "include",
			}).then((response) => {
				if (!response.ok) {
					console.log("Error", response);
				} else {
					dispatch({
						type: ReducerActionType.DELETE_TASK,
						payload: id,
					});
				}
			});
		} catch (response) {
			console.log("Error", response);
		}
	};

	const toogleTask = (id: string, completed: boolean): void => {
		try {
			const headers = new Headers() as HeadersInit["headers"];
			headers.append("Cookie", `PROD-APP-AUTH=${sessionToken}`);
			headers.append("Content-Type", "application/json");

			dispatch({ type: ReducerActionType.COMPLETE_TASK, payload: id });

			const data = { completed: !completed };

			fetch(properties.api_url + "/tasks/" + id, {
				method: "PATCH",
				headers,
				credentials: "include",
				body: JSON.stringify(data),
			}).then((response) => {
				if (!response.ok) {
					dispatch({
						type: ReducerActionType.COMPLETE_TASK,
						payload: id,
					});
					console.log("Error", response);
				}
			});
		} catch (response) {
			console.log("Error", response);
		}
	};

	const updateLabels = (id: string, labels: string[]): void => {
		try {
			const headers = new Headers() as HeadersInit["headers"];
			headers.append("Cookie", `PROD-APP-AUTH=${sessionToken}`);
			headers.append("Content-Type", "application/json");

			const data = { labels: labels };
			fetch(properties.api_url + "/tasks/" + id, {
				method: "PATCH",
				headers,
				credentials: "include",
				body: JSON.stringify(data),
			}).then((response) => {
				if (response.ok) {
					dispatch({
						type: ReducerActionType.UPDATE_TASK_LABELS,
						payload: { labels: labels, id: id },
					});
				}
			});
		} catch (response) {
			console.log("Error", response);
		}
	};

	const updatePriority = (id: String, priority: Number): void => {
		try {
			const headers = new Headers() as HeadersInit["headers"];
			headers.append("Cookie", `PROD-APP-AUTH=${sessionToken}`);
			headers.append("Content-Type", "application/json");

			const data = { priority: priority };
			fetch(properties.api_url + "/tasks/" + id, {
				method: "PATCH",
				headers,
				credentials: "include",
				body: JSON.stringify(data),
			}).then((response) => {
				if (response.ok) {
					dispatch({
						type: ReducerActionType.UPDATE_TASK_PRIORITY,
						payload: { priority: priority, id: id },
					});
				}
			});
		} catch (response) {
			console.log("Error", response);
		}
	};

	useEffect(() => {
		const token = Cookies.get("PROD-APP-AUTH");

		if (token) setSessionToken(token);

		fetchAllTasks(page, 10);
	}, [fetchAllTasks, page]);

	const handleChangeShowCompleted = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setShowCompleted(event.target.checked);
		if (event.target.checked) {
			applyFilter("completed");
		} else {
			applyFilter("pending");
		}
	};

	return (
		<Container>
			<Header>
				<h1>
					<TaskAltIcon /> Tareas
				</h1>
			</Header>
			<Content>
				{/* Filter and Sort Buttons */}
				<Box
					display="flex"
					justifyContent="flex-end"
					alignItems="center"
					gap={1}
				>
					{/* Filter Button */}
					<Tooltip title="Filtrar tareas">
						<IconButton color="primary" onClick={handleFilterClick}>
							<FilterAltIcon />
						</IconButton>
					</Tooltip>
					<Menu
						anchorEl={filterMenuAnchor}
						open={Boolean(filterMenuAnchor)}
						onClose={handleFilterClose}
					>
						<MenuItem>
							Mostrar completadas
							<Switch
								checked={showCompleted}
								onChange={handleChangeShowCompleted}
								inputProps={{ "aria-label": "controlled" }}
							/>
						</MenuItem>
						<MenuItem onClick={() => applyFilter("pending")}>
							Pendientes
						</MenuItem>
						<MenuItem onClick={() => applyFilter("priority")}>
							Prioridad
						</MenuItem>
					</Menu>

					{/* Sort Button */}
					<Tooltip title="Ordenar tareas">
						<IconButton color="primary" onClick={handleSortClick}>
							<SwapVertIcon />
						</IconButton>
					</Tooltip>
					<Menu
						anchorEl={sortMenuAnchor}
						open={Boolean(sortMenuAnchor)}
						onClose={handleSortClose}
					>
						<MenuItem onClick={() => applySort("name")}>
							Nombre
						</MenuItem>
						<MenuItem onClick={() => applySort("date")}>
							Fecha
						</MenuItem>
						<MenuItem onClick={() => applySort("priority")}>
							Prioridad
						</MenuItem>
					</Menu>
				</Box>
				<TaskQuickInputComponent addTask={addTask} />
				<TaskList
					tasks={state.tasks}
					deleteTask={deleteTask}
					toogleTask={toogleTask}
					updateLabels={updateLabels}
					updatePriority={updatePriority}
				/>
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
