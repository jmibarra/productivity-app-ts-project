import { Add, Close, Delete } from "@mui/icons-material";
import { Box, IconButton, ListSubheader } from "@mui/material";
import React from "react";

interface ListAdministrationBarComponentProps {
	showDeleteIcons: boolean;
	handleNewListClick: () => void;
	handleDeleteListsClick: () => void;
}
const ListAdministrationBarComponent = ({
	showDeleteIcons,
	handleNewListClick,
	handleDeleteListsClick,
}: ListAdministrationBarComponentProps) => {
	return (
		<ListSubheader>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-between"
			>
				Mis listas
				<Box justifyContent="flex-end">
					<IconButton
						aria-label="create"
						size="small"
						onClick={handleNewListClick}
					>
						<Add fontSize="inherit" />
					</IconButton>
					{showDeleteIcons ? (
						<IconButton
							aria-label="delete"
							size="small"
							onClick={handleDeleteListsClick}
						>
							<Close fontSize="inherit" />
						</IconButton>
					) : (
						<IconButton
							aria-label="delete"
							size="small"
							onClick={handleDeleteListsClick}
						>
							<Delete fontSize="inherit" />
						</IconButton>
					)}
				</Box>
			</Box>
		</ListSubheader>
	);
};

export default ListAdministrationBarComponent;
