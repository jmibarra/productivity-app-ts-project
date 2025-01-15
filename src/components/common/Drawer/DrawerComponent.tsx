import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotesIcon from "@mui/icons-material/Notes";
import BarChartIcon from "@mui/icons-material/BarChart";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";

import { ListItemButton } from "@mui/material";

import {
	DrawerHeader,
	Main,
	StyledDrawer,
} from "./styles/DrawerComponentStyles";
import Logout from "../../login/Logout";
import NavBar from "./Sections/AppBar/NavBar";
import TaskListSelectorComponent from "./Sections/TaskLists/TaskListSelectorComponent";

const mainActions = [
	{ customComponent: <TaskListSelectorComponent /> },
	{ icon: <NotesIcon />, name: "Notas", route: "/notes" },
	{ icon: <DirectionsRunIcon />, name: "Hábitos", route: "/habits" },
	{ icon: <BarChartIcon />, name: "Métricas", route: "/metrics" },
];

const appActions = [
	{
		icon: <KeyboardCommandKeyIcon />,
		name: "Configuración",
		route: "/config",
	},
];

interface Props {
	children: any;
}

interface Props {
	isLoggedIn: Boolean;
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export default function PersistentDrawerLeft({
	isLoggedIn,
	setIsLoggedIn,
	children,
}: Props) {
	const theme = useTheme();
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleRouteClick = (route: string) => {
		navigate(route);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<NavBar
				open={open}
				isLoggedIn={isLoggedIn}
				handleDrawerOpen={() => setOpen(true)}
			/>
			<StyledDrawer variant="persistent" anchor="left" open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "ltr" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				{isLoggedIn && (
					<>
						<List key="main-drawer">
							{mainActions.map((action, index) =>
								action.customComponent ? (
									action.customComponent
								) : (
									<ListItemButton
										key={action.name}
										onClick={() =>
											handleRouteClick(action.route)
										}
									>
										<ListItemIcon
											key={"icon" + action.name}
										>
											{action.icon}
										</ListItemIcon>
										<ListItemText
											primary={action.name}
											key={"txt" + action.name}
										/>
									</ListItemButton>
								)
							)}
						</List>
						<Divider />
						<List key="app-drawer">
							{appActions.map((action, index) => (
								<ListItemButton key={action.name}>
									<ListItemIcon key={"icon" + action.name}>
										{action.icon}
									</ListItemIcon>
									<ListItemText
										primary={action.name}
										onClick={() =>
											handleRouteClick(action.route)
										}
										key={"txt" + action.name}
									/>
								</ListItemButton>
							))}
							<Logout
								setIsLoggedIn={setIsLoggedIn}
								setOpen={setOpen}
							/>
						</List>
					</>
				)}
			</StyledDrawer>
			<Main open={open}>{children}</Main>
		</Box>
	);
}
