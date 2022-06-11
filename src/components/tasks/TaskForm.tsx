import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import shortid from "shortid";
import { Task } from "../../interfaces/tasks/interfaces";

type Inputs = {
    title: string,
    desc: string,
};

interface Props {
    addTask: (task: Task) => void,
    handleCloseModal: () => void,
    taskModalOpen:boolean
    
}

const TaskForm = ({addTask,taskModalOpen,handleCloseModal}:Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const createTask = (object:any) => { //Aca deberia ver que objeto me devuelve el form
        let task:Task = {...object,id: shortid.generate(),completed:false}
        console.log(task)
        addTask(task)
        handleCloseModal()
    }
    
    return (
        <Dialog
            open={taskModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <DialogTitle>Nueva tarea</DialogTitle>
            <form onSubmit={handleSubmit(createTask)}>
                <DialogContent>
                        <div> 
                            <TextField fullWidth variant="outlined"  placeholder="Título" {...register("title", {required: true})} />
                            {errors?.title && <span>This field is required</span>}
                        </div>
                        <br/>
                        <div>
                            <TextField
                                fullWidth
                                placeholder="Descripción"
                                multiline
                                rows={4}
                                {...register("desc", {required: true, maxLength: 100})}
                            />
                            {errors?.desc && <span>This field is required</span>}
                        </div>
                    
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

