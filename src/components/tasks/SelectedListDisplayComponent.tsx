import { Box, ListItemText } from "@mui/material";
import React from "react";
import ListCustomIconComponent from "../common/Drawer/Sections/TaskLists/ListCustomIconComponent";

interface SelectedListDisplayComponentProps {
	selectedListId: string;
}
const SelectedListDisplayComponent = ({
	selectedListId,
}: SelectedListDisplayComponentProps) => {
	return (
		<Box display="flex" justifyContent="space-between" width="100%">
			<Box display="flex" alignItems="center" justifyContent={"center"}>
				<ListCustomIconComponent listIcon="Inbox" />
				<ListItemText
					primary={selectedListId}
					primaryTypographyProps={{
						color: "primary",
						fontWeight: "medium",
						variant: "body2",
					}}
				/>
			</Box>
		</Box>
	);
};

export default SelectedListDisplayComponent;
