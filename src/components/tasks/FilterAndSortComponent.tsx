import {
	Box,
	Divider,
	IconButton,
	Menu,
	MenuItem,
	Switch,
	ToggleButton,
	ToggleButtonGroup,
	Tooltip,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useState } from "react";

import TextFormatIcon from "@mui/icons-material/TextFormat";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AlarmIcon from "@mui/icons-material/Alarm";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

interface FilterAndSortComponentProps {
	showCompleted: boolean;
	setShowCompleted: React.Dispatch<React.SetStateAction<boolean>>;
	setSortOption: React.Dispatch<React.SetStateAction<string>>;
	sortDirection: string;
	setSortDirection: React.Dispatch<React.SetStateAction<string>>;
}

const FilterAndSortComponent = ({
	showCompleted,
	setShowCompleted,
	setSortOption,
	sortDirection,
	setSortDirection,
}: FilterAndSortComponentProps) => {
	const [sortMenuAnchor, setSortMenuAnchor] = useState<null | HTMLElement>(
		null
	);
	const [filterMenuAnchor, setFilterMenuAnchor] =
		useState<null | HTMLElement>(null);

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

	const applyFilter = (filterType: string) => {
		console.log(`Applying filter: ${filterType}`);
	};

	const applySort = (sortType: string) => {
		console.log(`Applying sort: ${sortType}`);
		setSortOption(sortType);
		handleSortClose();
	};

	const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
		setSortMenuAnchor(event.currentTarget);
	};

	const handleSortClose = () => {
		setSortMenuAnchor(null);
	};

	const handleFilterClose = () => {
		setFilterMenuAnchor(null);
	};

	const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
		setFilterMenuAnchor(event.currentTarget);
	};

	const handleChangeOrderDirection = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		setSortDirection(newAlignment);
	};

	return (
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
				<MenuItem onClick={() => applySort("title")}>
					<TextFormatIcon /> Nombre
				</MenuItem>
				<MenuItem onClick={() => applySort("createdAt")}>
					<CalendarMonthIcon /> Fecha de creación
				</MenuItem>
				<MenuItem onClick={() => applySort("dueDate")}>
					<AlarmIcon /> Fecha de vencimiento
				</MenuItem>
				<MenuItem onClick={() => applySort("priority")}>
					<PriorityHighIcon /> Prioridad
				</MenuItem>
				<Divider />
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<ToggleButtonGroup
						color="primary"
						value={sortDirection}
						exclusive
						onChange={handleChangeOrderDirection}
						aria-label="Platform"
					>
						<ToggleButton value="asc">Asc</ToggleButton>
						<ToggleButton value="desc">Desc</ToggleButton>
					</ToggleButtonGroup>
				</Box>
			</Menu>
		</Box>
	);
};

export default FilterAndSortComponent;
