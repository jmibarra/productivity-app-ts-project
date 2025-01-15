import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Drawer } from '@mui/material';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
    backgroundColor: theme.palette.background.default, // Fondo elegante para el main
}));

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    background: `linear-gradient(90deg, ${theme.palette.primary.light} 10%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.dark} 80%)`,
    color: theme.palette.common.white,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    paddingRight: theme.spacing(2),
}));


export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    backgroundColor: theme.palette.background.paper, // Fondo elegante para el drawer
    boxShadow: 'inset 0px -1px 0px rgba(0, 0, 0, 0.1)',
}));

export const StyledDrawer = styled(Drawer)`
  width: ${props => drawerWidth}px;
  flex-shrink: 0;
  & .MuiDrawer-paper {
    width: ${props => drawerWidth}px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.palette.background.paper};
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); // Sombra elegante para el drawer
  }
`;
