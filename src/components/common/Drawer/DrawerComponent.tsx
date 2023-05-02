import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import NotesIcon from '@mui/icons-material/Notes';
import BarChartIcon from '@mui/icons-material/BarChart';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';

import { useNavigate } from "react-router-dom";
import { Button, ListItemButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { AppBar, DrawerHeader, Main, StyledDrawer } from './DrawerComponentStyles';

const mainActions = [
        { icon: <TaskAltIcon />, name: 'Tareas', route: '/todos' },
        { icon: <NotesIcon />, name: 'Notas', route: '/notes' },
        { icon: <DirectionsRunIcon />, name: 'Hábitos', route: '/habits' },
        { icon: <BarChartIcon />, name: 'Métricas', route: '/metrics' }
];

const appActions = [
        { icon: <KeyboardCommandKeyIcon />, name: 'Configuración', route: '/config' },
        { icon: <LogoutIcon />, name: 'Logout', route: '/logout' },
  ];

interface Props {
    children: any;
}

export default function PersistentDrawerLeft({children}:Props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleRouteClick = (route:string) => {
        navigate(route)
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Productivity App
                    </Typography>
                    {auth && (
                        <div>
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
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {!auth && <Button color="inherit" onClick={ () => handleRouteClick('/login')}>Login</Button>}
                </Toolbar>
                
            </AppBar>
            <StyledDrawer variant="persistent" anchor="left" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {mainActions.map((action, index) => (
                        <ListItemButton key={action.name} onClick={ () => handleRouteClick(action.route)}>
                            <ListItemIcon>
                                {action.icon}
                            </ListItemIcon>
                            <ListItemText primary={action.name} />
                        </ListItemButton>
                    
                    ))}
                </List>
                <Divider />
                <List>
                    {appActions.map((action, index) => (
                        <ListItemButton key={action.name} >
                            <ListItemIcon>
                                {action.icon}
                            </ListItemIcon>
                            <ListItemText primary={action.name} onClick={ () => handleRouteClick(action.route)}/>
                        </ListItemButton>
                    ))}
                </List>
            </StyledDrawer>
            <Main open={open}>
                {children}        
            </Main>
        </Box>
  );
}