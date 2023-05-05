import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';

interface Props {
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const Logout = ({setIsLoggedIn,setOpen}:Props) => {

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleCloseDialog = () => {
        if (dialogOpen) {
            setDialogOpen(false);
        }
    }
    
    const handleLogout = () => {
        setDialogOpen(false);
        Cookies.remove("PROD-APP-AUTH");
        setIsLoggedIn(false);
        setOpen(false);
    }
    
    const handleOpenDialog = () => {
        setDialogOpen(true);
    }

    return (
        <>
            <ListItemButton key='Logout' onClick={handleOpenDialog}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary='Logout'/>
            </ListItemButton>
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Confirmar cierre de sesión</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Está seguro que desea cerrar sesión?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleLogout}>Cerrar sesión</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Logout
