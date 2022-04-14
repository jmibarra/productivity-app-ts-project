import { Task } from "../interfaces/interfaces"
import List from '@mui/material/List';
import TaskComponent from "./Task";

interface Props {
    tasks: Task[],
    deleteTask: any
    toogleTask: any //Ver como definir que espero una funcion
}

const TaskList = ({tasks,deleteTask,toogleTask}:Props) => {

    return (
    <>
         <h2>Tareas</h2>
         <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {tasks.map((task:Task,index) => {
                return (
                    <TaskComponent task={task} index={index} deleteTask={deleteTask} toogleTask={toogleTask}/>
                );
            })}
        </List>
    </>
  )
}

export default TaskList