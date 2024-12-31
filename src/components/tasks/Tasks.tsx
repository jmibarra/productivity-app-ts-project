import { useCallback, useEffect, useReducer, useState } from "react";
import { ReducerActionType } from "../../actions/tasks";
import { tasksReducer, initialState } from "../../reducers/tasks";
import { Task } from "../../interfaces/tasks/interfaces";
import { properties } from "../../properties";
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
import { CircularProgress } from "@mui/material";
import { ItemLoading } from "../notes/styles/NotesStyles";
import FilterAndSortComponent from "./FilterAndSortComponent";

interface HeadersInit {
	headers: Headers;
	credentials: RequestCredentials;
}

const Tasks = () => {
	const [loading, setLoading] = useState(false);
	const [state, dispatch] = useReducer(tasksReducer, initialState);
	const [taskFormModalOpen, settaskFormModalOpen] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [sessionToken, setSessionToken] = useState<string | null>(null);

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
	};

	const fetchAllTasks = useCallback(
		async (page: number, limit: number, filter: string) => {
			try {
				setLoading(true);
				const headers = new Headers() as HeadersInit["headers"];
				headers.append("Cookie", `PROD-APP-AUTH=${sessionToken}`);

				const url = `${properties.api_url}/tasks?page=${page}&limit=${limit}`;

				fetch(url, {
					headers,
					credentials: "include",
				})
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
						setLoading(false);
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

		fetchAllTasks(page, 10, "");
	}, [fetchAllTasks, page]);

	return (
		<Container>
			<Header>
				<h1>
					<TaskAltIcon /> Tareas
				</h1>
			</Header>
			<Content>
				<FilterAndSortComponent />
				<TaskQuickInputComponent addTask={addTask} />
				{loading ? (
					<ItemLoading>
						<CircularProgress />
					</ItemLoading>
				) : (
					<TaskList
						tasks={state.tasks}
						deleteTask={deleteTask}
						toogleTask={toogleTask}
						updateLabels={updateLabels}
						updatePriority={updatePriority}
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
