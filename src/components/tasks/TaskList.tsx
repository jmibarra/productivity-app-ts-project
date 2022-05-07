import { Task } from "../../interfaces/tasks/interfaces"
import List from '@mui/material/List';
import TaskComponent from "./Task";

interface Props {
    tasks: Task[],
    deleteTask: (id: string) => void,
    toogleTask: (id: string, completed: boolean) => void
}

const TaskList = ({tasks,deleteTask,toogleTask}:Props) => {

    return (
    <>
         <h2>Tareas</h2>
         <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {tasks.map((task:Task,index) => {
                return (
                    <TaskComponent task={task} index={index} deleteTask={deleteTask} toogleTask={toogleTask} key={task.id}/>
                );
            })}
        </List>
    </>
  )
}

export default TaskList