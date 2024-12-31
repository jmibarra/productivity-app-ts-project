import {
	Box,
	IconButton,
	Menu,
	MenuItem,
	Switch,
	Tooltip,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useState } from "react";

interface FilterAndSortComponentProps {
	showCompleted: boolean;
	setShowCompleted: React.Dispatch<React.SetStateAction<boolean>>;
	setSortOption: React.Dispatch<React.SetStateAction<string>>;
}

const FilterAndSortComponent = ({
	showCompleted,
	setShowCompleted,
	setSortOption,
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
				<MenuItem onClick={() => applySort("name")}>Nombre</MenuItem>
				<MenuItem onClick={() => applySort("dueDate")}>
					Fecha de vencimiento
				</MenuItem>
				<MenuItem onClick={() => applySort("priority")}>
					Prioridad
				</MenuItem>
			</Menu>
		</Box>
	);
};

export default FilterAndSortComponent;
