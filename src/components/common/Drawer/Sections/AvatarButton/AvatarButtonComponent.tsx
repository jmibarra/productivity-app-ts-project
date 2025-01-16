import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const AvatarButtonComponent = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const navigate = useNavigate();

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleRouteClick = (route: string) => {
		navigate(route);
		handleClose();
	};
	return (
		<>
			<Avatar
				src="https://media.licdn.com/dms/image/v2/C4E03AQHc3ZyN7_o_1Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1616351350827?e=1741219200&v=beta&t=lCCs-byJtbdnw343Svv9cl1kg32OinXbS65_uJtJPc0"
				alt="avatar"
				onClick={handleMenu}
			>
				<AccountCircle />
			</Avatar>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "bottom",
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
				<MenuItem disabled>Juan Manuel Ibarra</MenuItem>
				<Divider />
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<Divider />
				<MenuItem onClick={() => handleRouteClick("/config")}>
					<ListItemIcon>
						<Settings fontSize="small" />
					</ListItemIcon>
					Configuración
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</>
	);
};

export default AvatarButtonComponent;
