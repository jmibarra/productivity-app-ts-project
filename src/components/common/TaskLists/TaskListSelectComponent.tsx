import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { initialState, taskListsReducer } from "../../../reducers/taksLists";
import { fetchUserLists } from "../../../services/taskListsServices";
import { ReducerActionType } from "../../../actions/tasksLists";
import Cookies from "js-cookie";

interface Props {
	currentList: number | undefined;
	setCurrentList: (list: number) => void;
}

export default function TaskListSelectComponent({
	currentList,
	setCurrentList,
}: Props) {
	const [selectedList, setSelectedList] = React.useState<string | "">(
		currentList?.toString() || ""
	);
	const [sessionToken, setSessionToken] = React.useState<string | null>(null);
	const [state, dispatch] = React.useReducer(taskListsReducer, initialState);

	const fetchAllLists = React.useCallback(async () => {
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

	React.useEffect(() => {
		const token = Cookies.get("PROD-APP-AUTH");
		if (token) {
			setSessionToken(token);
			fetchAllLists();
		}
	}, [fetchAllLists]);

	// Sincroniza el estado del selector con la prop `currentList`
	React.useEffect(() => {
		if (currentList !== undefined) {
			setSelectedList(currentList.toString());
		}
	}, [currentList]);

	const handleChange = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		setSelectedList(newValue);
		setCurrentList(parseInt(newValue, 10));
		//Aquí debería llamar al reducer que setea la lista para la task
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
