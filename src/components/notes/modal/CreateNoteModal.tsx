import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ListItem, TextField } from '@mui/material';
import { SketchPicker } from 'react-color';

import { useFormik } from 'formik';
import { initialValues, validationSchema } from './shemas';

import { Note } from '../../../interfaces/tasks/interfaces';
import LabelsComponent from '../../common/Labels/LabelsComponent';

interface Props {
    addNote: (note: Note) => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateNoteModalComponent({ addNote }: Props) {
    const [open, setOpen] = React.useState(false);
    const [selectedColor, setSelectedColor] = React.useState('#000000'); // Estado para almacenar el color seleccionado
    const [labels, setLabels] = React.useState<string[]>([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (object: any) => {
        createNote(object);
        },
    });

    const createNote = (object: any) => {
        let note: Note = { ...object, createdAt: new Date(), favorite: false, color: selectedColor, labels:labels }; // Utiliza el color seleccionado en la nota
        addNote(note);
        handleClose();
    };

    const updateLabels = (id:string, labels: string[]):void => {
        setLabels(labels);
    }

    const handleColorChange = (color: any) => {
        setSelectedColor(color.hex);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Nueva nota
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <form onSubmit={formik.handleSubmit}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Nueva nota
                    </Typography>
                    <Button type="submit" autoFocus color="inherit" onClick={handleClose} disabled={!formik.isValid}>
                        crear
                    </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem>
                    <TextField
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="title"
                        placeholder="Título"
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                        onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                        }
                        }}
                    />
                    </ListItem>
                    <ListItem>
                    <TextField
                        fullWidth
                        multiline
                        variant="outlined"
                        name="content"
                        placeholder="Contenido"
                        onChange={formik.handleChange}
                        error={formik.touched.content && Boolean(formik.errors.content)}
                        helperText={formik.touched.content && formik.errors.content}
                    />
                    </ListItem>
                    <ListItem>
                        <SketchPicker
                            color={selectedColor}
                            onChange={handleColorChange}
                        />
                    </ListItem>
                    <ListItem>
                        <LabelsComponent labels={labels} taskId='' updateLabels={updateLabels}/>
                    </ListItem>
                </List>
                </form>
            </Dialog>
        </div>
    ); 
}