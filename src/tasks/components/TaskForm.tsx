import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import shortid from "shortid";

type Inputs = {
    title: string,
    desc: string,
};

interface Props { //TODO: Ver bien como hacer eso
    addTask: any
  }

const TaskForm = ({addTask}:Props) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const createTask = (object:any) => {
        addTask({...object,id: shortid.generate(),completed:false})
    }
    
    return (
        <>
            <h3>Nueva tarea</h3>
            <form onSubmit={handleSubmit(createTask)}>
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
                <br/>
                <Button type="submit" variant="contained">Agregar tarea</Button>
            </form>
        </>
    )
}

export default TaskForm