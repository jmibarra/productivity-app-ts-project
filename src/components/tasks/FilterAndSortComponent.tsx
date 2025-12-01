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
	Typography,
	Zoom,
	styled,
	tooltipClasses,
	TooltipProps,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useState } from "react";

import TextFormatIcon from "@mui/icons-material/TextFormat";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AlarmIcon from "@mui/icons-material/Alarm";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { blue, grey, red, yellow } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";

interface FilterAndSortComponentProps {
	showCompleted: boolean;
	setShowCompleted: React.Dispatch<React.SetStateAction<boolean>>;
	setSortOption: React.Dispatch<React.SetStateAction<string>>;
	sortDirection: string;
	setSortDirection: React.Dispatch<React.SetStateAction<string>>;
	filterPriority: number | null;
	setFilterPriority: React.Dispatch<React.SetStateAction<number | null>>;
}

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.common.white,
		color: "rgba(0, 0, 0, 0.87)",
		boxShadow: theme.shadows[1],
		fontSize: 12,
		borderRadius: 8,
		padding: "8px 12px",
		border: "1px solid #dadde9",
	},
	[`& .${tooltipClasses.arrow}`]: {
		color: theme.palette.common.white,
		"&:before": {
			border: "1px solid #dadde9",
		},
	},
}));

const FilterAndSortComponent = ({
	showCompleted,
	setShowCompleted,
	setSortOption,
	sortDirection,
	setSortDirection,
	filterPriority,
	setFilterPriority,
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
	};

	const applySort = (sortType: string) => {
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
		if (newAlignment !== null) {
			setSortDirection(newAlignment);
		}
	};

	const priorities = [
		{ value: 1, label: "Alta", icon: <PriorityHighIcon fontSize="small" />, color: red[500] },
		{ value: 2, label: "Media", icon: <LowPriorityIcon fontSize="small" />, color: yellow[700] },
		{ value: 3, label: "Baja", icon: <AcUnitIcon fontSize="small" />, color: blue[500] },
		{ value: 4, label: "Ninguna", icon: <QuestionMarkIcon fontSize="small" />, color: grey[500] },
	];

	return (
		<>
			{/* Filter Button */}
			<StyledTooltip title="Filtrar tareas" arrow TransitionComponent={Zoom}>
				<IconButton color="primary" onClick={handleFilterClick}>
					<FilterAltIcon />
				</IconButton>
			</StyledTooltip>
			<Menu
				anchorEl={filterMenuAnchor}
				open={Boolean(filterMenuAnchor)}
				onClose={handleFilterClose}
				PaperProps={{
					sx: { width: 250, borderRadius: 3, mt: 1 }
				}}
			>
				<Box px={2} py={1}>
					<Typography variant="subtitle2" color="text.secondary" fontWeight="bold">
						Estado
					</Typography>
				</Box>
				<MenuItem>
					<Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
						<Typography variant="body2">Mostrar completadas</Typography>
						<Switch
							size="small"
							checked={showCompleted}
							onChange={handleChangeShowCompleted}
						/>
					</Box>
				</MenuItem>
				
				<Divider sx={{ my: 1 }} />
				
				<Box px={2} py={1}>
					<Typography variant="subtitle2" color="text.secondary" fontWeight="bold">
						Prioridad
					</Typography>
				</Box>
				
				<MenuItem 
					onClick={() => setFilterPriority(null)}
					selected={filterPriority === null}
				>
					<Box display="flex" alignItems="center" gap={1} width="100%">
						<Box width={24} display="flex" justifyContent="center">
							{filterPriority === null && <CheckIcon fontSize="small" color="primary" />}
						</Box>
						<Typography variant="body2">Todas</Typography>
					</Box>
				</MenuItem>
				
				{priorities.map((priority) => (
					<MenuItem 
						key={priority.value}
						onClick={() => setFilterPriority(priority.value)}
						selected={filterPriority === priority.value}
					>
						<Box display="flex" alignItems="center" gap={1} width="100%">
							<Box width={24} display="flex" justifyContent="center">
								{filterPriority === priority.value && <CheckIcon fontSize="small" color="primary" />}
							</Box>
							<Box display="flex" alignItems="center" gap={1} color={priority.color}>
								{priority.icon}
								<Typography variant="body2" color="text.primary">{priority.label}</Typography>
							</Box>
						</Box>
					</MenuItem>
				))}
			</Menu>

			{/* Sort Button */}
			<StyledTooltip title="Ordenar tareas" arrow TransitionComponent={Zoom}>
				<IconButton color="primary" onClick={handleSortClick}>
					<SwapVertIcon />
				</IconButton>
			</StyledTooltip>
			<Menu
				anchorEl={sortMenuAnchor}
				open={Boolean(sortMenuAnchor)}
				onClose={handleSortClose}
				PaperProps={{
					sx: { width: 220, borderRadius: 3, mt: 1 }
				}}
			>
				<Box px={2} py={1}>
					<Typography variant="subtitle2" color="text.secondary" fontWeight="bold">
						Ordenar por
					</Typography>
				</Box>
				<MenuItem onClick={() => applySort("title")}>
					<TextFormatIcon sx={{ mr: 1, color: "text.secondary" }} fontSize="small" /> 
					<Typography variant="body2">Nombre</Typography>
				</MenuItem>
				<MenuItem onClick={() => applySort("createdAt")}>
					<CalendarMonthIcon sx={{ mr: 1, color: "text.secondary" }} fontSize="small" /> 
					<Typography variant="body2">Fecha de creación</Typography>
				</MenuItem>
				<MenuItem onClick={() => applySort("dueDate")}>
					<AlarmIcon sx={{ mr: 1, color: "text.secondary" }} fontSize="small" /> 
					<Typography variant="body2">Fecha de vencimiento</Typography>
				</MenuItem>
				<MenuItem onClick={() => applySort("priority")}>
					<PriorityHighIcon sx={{ mr: 1, color: "text.secondary" }} fontSize="small" /> 
					<Typography variant="body2">Prioridad</Typography>
				</MenuItem>
				<Divider sx={{ my: 1 }} />
				<Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
					<ToggleButtonGroup
						color="primary"
						value={sortDirection}
						exclusive
						onChange={handleChangeOrderDirection}
						aria-label="Sort direction"
						size="small"
						fullWidth
					>
						<ToggleButton value="asc">Ascendente</ToggleButton>
						<ToggleButton value="desc">Descendente</ToggleButton>
					</ToggleButtonGroup>
				</Box>
			</Menu>
		</>
	);
};

export default FilterAndSortComponent;
