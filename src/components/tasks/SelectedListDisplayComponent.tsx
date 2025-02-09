import { Box, CircularProgress, ListItemText } from "@mui/material";
import { useCallback, useEffect, useReducer, useState } from "react";
import Cookies from "js-cookie";
import ListCustomIconComponent from "../common/Drawer/Sections/TaskLists/ListCustomIconComponent";
import { fetchUserLists } from "../../services/taskListsServices";
import { ReducerTaskListActionType } from "../../actions/tasksLists";
import { initialState, taskListsReducer } from "../../reducers/taksLists";
import { TaskList } from "../../interfaces";

interface SelectedListDisplayComponentProps {
	selectedListId: string;
}
const SelectedListDisplayComponent = ({
	selectedListId,
}: SelectedListDisplayComponentProps) => {
	const [selectdList, setSelectedList] = useState<TaskList | undefined>(
		undefined
	);
	const [sessionToken, setSessionToken] = useState<string | null>(null);
	const [state, dispatch] = useReducer(taskListsReducer, initialState);

	const fetchAllLists = useCallback(async () => {
		try {
			const responseJson = await fetchUserLists(sessionToken);
			dispatch({
				type: ReducerTaskListActionType.GET_USER_LISTS,
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
		setSelectedList(
			state.taskLists.find((list) => list._id === selectedListId)
		);
	}, [fetchAllLists]);

	useEffect(() => {
		setSelectedList(
			state.taskLists.find((list) => list._id === selectedListId) || {
				_id: "0",
				name: "Todas",
				icon: "All",
			}
		);
	}, [state.taskLists, selectedListId]);

	return selectdList ? (
		<Box display="flex" justifyContent="space-between" width="100%">
			<Box display="flex" alignItems="center" justifyContent={"center"}>
				<ListCustomIconComponent listIcon={selectdList?.icon} />
				<ListItemText
					primary={selectdList?.name}
					primaryTypographyProps={{
						color: "primary",
						fontWeight: "medium",
						variant: "body2",
					}}
				/>
			</Box>
		</Box>
	) : (
		<CircularProgress />
	);
};

export default SelectedListDisplayComponent;
