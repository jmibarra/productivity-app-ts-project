import React from "react";
import { TaskList } from "../../../../interfaces";
import {
	StarBorder,
	Inbox,
	TaskAlt,
	BusinessCenter,
	Add,
	Person,
	AllInclusive,
	ListAlt,
} from "@mui/icons-material";
import { ListItemIcon } from "@mui/material";

export const listIconsMap: { [key: string]: React.ReactNode } = {
	Inbox: <Inbox fontSize="small" color="primary" />,
	Task: <TaskAlt fontSize="small" color="primary" />,
	Business: <BusinessCenter fontSize="small" color="primary" />,
	Star: <StarBorder fontSize="small" color="primary" />,
	All: <AllInclusive fontSize="small" color="primary" />,
	Add: <Add fontSize="small" color="primary" />,
	Person: <Person fontSize="small" color="primary" />,
};

export const ListCustomIconComponent: React.FC<{
	listIcon: string | undefined;
}> = ({ listIcon }) => {
	if (!listIcon) {
		return (
			<ListItemIcon>
				<ListAlt fontSize="small" color="primary" />
			</ListItemIcon>
		);
	}

	return (
		<ListItemIcon>
			{listIconsMap[listIcon] || (
				<ListAlt fontSize="small" color="primary" />
			)}
		</ListItemIcon>
	);
};

export default ListCustomIconComponent;
