import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import shortid from "shortid";
import { Task } from "../../interfaces/tasks/interfaces";

type Inputs = {
    title: string,
    desc: string,
};

interface Props { //TODO: Ver bien como hacer eso
    addTask: (task: Task) => void,
    toogleModal: () => void,
    taskModalOpen:boolean
    
}

const TaskForm = ({addTask,toogleModal,taskModalOpen}:Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const createTask = (object:any) => {
        addTask({...object,id: shortid.generate(),completed:false})
        toogleModal()
    }
    
    return (
        <Dialog
            open={taskModalOpen}
            onClose={toogleModal}
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
                    <Button type="submit" variant="contained">Agregar tarea</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default TaskForm

