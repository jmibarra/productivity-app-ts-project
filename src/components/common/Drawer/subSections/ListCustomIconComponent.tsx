import React from "react";
import { TaskList } from "../../../../interfaces";
import {
	ExpandLess,
	ExpandMore,
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

interface IconComponentProps {
	list: TaskList;
}
const ListCustomIconComponent = ({ list }: IconComponentProps) => {
	return (
		<>
			{list.icon ? (
				<ListItemIcon>{list.icon}</ListItemIcon>
			) : (
				<ListItemIcon>
					<ListAlt fontSize="small" color="primary" />
				</ListItemIcon>
			)}
		</>
	);
};

export default ListCustomIconComponent;
