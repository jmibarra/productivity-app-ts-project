import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { initialState, taskListsReducer } from "../../../reducers/taksLists";
import { fetchUserLists } from "../../../services/taskListsServices";
import Cookies from "js-cookie";
import { patchTask } from "../../../services/tasksServices";
import { ReducerTaskListActionType } from "../../../actions/tasksLists";
import { ReducerActionType } from "../../../actions/tasks";
import {
	tasksReducer,
	initialState as initialTaskState,
} from "../../../reducers/tasks";
import { Task } from "../../../interfaces";

interface Props {
	task: Task;
}

export default function TaskListSelectComponent({ task }: Props) {
	const [selectedList, setSelectedList] = React.useState<string | "">(
		task.list || ""
	);
	const [sessionToken, setSessionToken] = React.useState<string | null>(null);
	const [state, dispatch] = React.useReducer(taskListsReducer, initialState);
	const [taskState, taskDispatch] = React.useReducer(
		tasksReducer,
		initialTaskState
	);

	const fetchAllLists = React.useCallback(async () => {
		try {
			const responseJson = await fetchUserLists();
			dispatch({
				type: ReducerTaskListActionType.GET_USER_LISTS,
				payload: responseJson,
			});
		} catch (error) {
			console.error("Error fetching lists", error);
		}
	}, [sessionToken]);

	React.useEffect(() => {
		const token = Cookies.get("PROD-APP-AUTH");
		if (token) {
			setSessionToken(token);
		}
		fetchAllLists();
	}, [fetchAllLists]);

	// Sincroniza el estado del selector con la prop `currentList`
	React.useEffect(() => {
		if (task.list !== undefined) {
			setSelectedList(task.list);
		}
	}, [task.list]);

	const handleChange = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		console.log("handleChange", newValue);
		setSelectedList(newValue);
		updateList(task._id, newValue);
	};

	const updateList = (id: string, list: string): void => {
		try {
			taskDispatch({
				type: ReducerActionType.UPDATE_TASK_LIST,
				payload: { list: list, id: id },
			});
			const data = { list: list };
			console.log(data);
			patchTask(id, data);
		} catch (response) {
			console.log("Error", response);
		}
	};

	return (
		<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
			<InputLabel id="task-list-select-label">Lista</InputLabel>
			<Select
				labelId="task-list-select-label"
				id="task-list-select"
				value={selectedList}
				label="List"
				onChange={handleChange}
			>
				{state.taskLists.map((list) => (
					<MenuItem key={list._id} value={list._id.toString()}>
						{list.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
