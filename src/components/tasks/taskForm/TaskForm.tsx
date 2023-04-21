import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import shortid from "shortid";
import { Task } from "../../../interfaces/tasks/interfaces";
import { useFormik } from "formik"
import {initialValues, validationSchema} from "./schemas"
import * as Yup from "yup";
import LabelsComponent from "../../common/Labels/LabelsComponent";
import { Item } from "./TaskFormStyles";

interface Props {
    addTask: (task: Task) => void,
    handleCloseModal: () => void,
    taskModalOpen:boolean
    
}

const TaskForm = ({addTask,taskModalOpen,handleCloseModal}:Props) => {
    
    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (object:any) => {
            createTask(object)
        }
    })
    
    const createTask = (object:any) => { //Aca deberia ver que objeto me devuelve el form
        let task:Task = {...object,id: shortid.generate(),completed:false}
        addTask(task)
        handleCloseModal()
    }

    const updateLabels = (id:string, labels: string[]):void => {}
    
    return (
        <Dialog
            open={taskModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <DialogTitle>Nueva tarea</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                        <div> 
                            <TextField type="text" 
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
                        </div>
                        <br/>
                        <div>
                            <TextField
                                name="description"
                                fullWidth
                                placeholder="Descripción"
                                onChange={formik.handleChange} 
                                multiline
                                rows={4}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </div>
                        <Item><LabelsComponent labels={[]} taskId="0" updateLabels={updateLabels}/></Item>
                        

                    
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained">Agregar tarea</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default TaskForm

