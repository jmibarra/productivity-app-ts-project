import React, { useState } from "react";
import { AppBar } from "../DrawerComponentStyles";
import {
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
	open: boolean;
	isLoggedIn: Boolean;
	handleDrawerOpen: () => void;
}

const NavBar = ({ open, isLoggedIn, handleDrawerOpen }: NavBarProps) => {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleRouteClick = (route: string) => {
		navigate(route);
	};

	return (
		<AppBar position="fixed" open={open}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					sx={{ mr: 2, ...(open && { display: "none" }) }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap component="div">
					Productivity App
				</Typography>
				<Box sx={{ ml: "auto" }}>
					{isLoggedIn ? (
						<>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem onClick={handleClose}>
									Profile
								</MenuItem>
								<MenuItem onClick={handleClose}>
									My account
								</MenuItem>
							</Menu>
						</>
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
