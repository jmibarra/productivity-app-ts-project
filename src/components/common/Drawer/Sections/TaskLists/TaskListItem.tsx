import {
	IconButton,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import ListCustomIconComponent from "./ListCustomIconComponent";

import { Delete } from "@mui/icons-material";

interface TaskListItemsProps {
	list: any;
	showDeleteIcons: boolean;
	handleRouteClick: (route: string) => void;
	handleDeleteList: (id: string) => void;
	selectdListId: string | null;
}
const TaskListItem = ({
	list,
	showDeleteIcons,
	handleRouteClick,
	handleDeleteList,
	selectdListId,
}: TaskListItemsProps) => {
	return (
		<ListItem
			key={list._id}
			secondaryAction={
				showDeleteIcons ? (
					<IconButton
						aria-label="delete-list"
						size="small"
						onClick={() => handleDeleteList(list._id)}
					>
						<Delete fontSize="small" color="error" />
					</IconButton>
				) : null
			}
			selected={list._id === selectdListId}
		>
			<ListItemButton
				key={list._id}
				onClick={() => handleRouteClick("/todos?listId=" + list._id)}
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
	);
};

export default TaskListItem;
