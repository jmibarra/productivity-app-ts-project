import { AppBar } from "../../styles/DrawerComponentStyles";
import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import AvatarButtonComponent from "../AvatarButton/AvatarButtonComponent";

interface NavBarProps {
	open: boolean;
	isLoggedIn: Boolean;
	handleDrawerOpen: () => void;
}

const NavBar = ({ open, isLoggedIn, handleDrawerOpen }: NavBarProps) => {
	const navigate = useNavigate();

	const handleRouteClick = (route: string) => {
		navigate(route);
	};

	return (
		<AppBar position="fixed" open={open}>
			<Toolbar>
				{isLoggedIn && (
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: "none" }) }}
					>
						<MenuIcon />
					</IconButton>
				)}
				<Typography variant="h6" noWrap component="div">
					Productivity App
				</Typography>
				<Box sx={{ ml: "auto" }}>
					{isLoggedIn ? (
						<AvatarButtonComponent />
					) : (
						<Button
							color="inherit"
							onClick={() => handleRouteClick("/login")}
						>
							Login
						</Button>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
