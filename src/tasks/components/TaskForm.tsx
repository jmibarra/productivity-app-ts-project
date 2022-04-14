import { Box, Button, TextField } from "@mui/material";
import { useForm,SubmitHandler } from "react-hook-form"

type Inputs = {
    title: string,
    description: string,
};


const TaskForm = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
    
    return (
        <>
            <h3>Nueva tarea</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div> 
                    <TextField variant="outlined"  placeholder="Título" {...register("title", {required: true})} />
                    {errors?.title && <span>This field is required</span>}
                </div>
                <br/>
                <div>
                    <TextField
                        placeholder="Descripción"
                        multiline
                        rows={4}
                        {...register("description", {required: true, maxLength: 100})}
                    />
                    {errors?.description && <span>This field is required</span>}
                </div>
                <br/>
                <Button type="submit" variant="contained">Agregar tarea</Button>
            </form>
        </>
    )
}

export default TaskForm