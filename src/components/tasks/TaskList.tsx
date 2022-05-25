import { Task } from "../../interfaces/tasks/interfaces"
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import TaskComponent from "./Task";
import TaskQuickInputComponent from "./TaskQuickInput";
import { useState } from "react";
import TaskModal from "./modal/TaskModal";

interface Props {
    tasks: Task[],
    addTask: (task:Task) => void,
    deleteTask: (id: string) => void,
    toogleTask: (id: string, completed: boolean) => void
    getSelectedTask: (taskId:string) => void
    selectedTask?: Task
}

const TaskList = ({tasks,addTask,deleteTask,toogleTask,getSelectedTask,selectedTask}:Props) => {

    const [page, setPage] = useState(1);
    const [taskModalOpen, setTaskModalOpen] = useState(false)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        alert(value)
        setPage(value);
    };

    const toogleTaskModal = () => {
        setTaskModalOpen(!taskModalOpen)
    }

    const handleSelectTask = (id:string) => {
        toogleTaskModal()
        getSelectedTask(id)
    }

    return (
    <>
        <h2>Tareas</h2>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <TaskQuickInputComponent addTask={addTask}/>
            {tasks.map((task:Task,index) => {
                return (
                    <TaskComponent task={task} index={index} deleteTask={deleteTask} toogleTask={toogleTask} handleSelectTask={handleSelectTask} key={task.id}/>
                );
            })}
        </List>
        <Pagination count={10} page={page} onChange={handleChange} variant="outlined" color="primary" />
        <TaskModal toogleModal={toogleTaskModal} taskModalOpen={taskModalOpen} selectedTask={selectedTask} />
    </>
  )
}

export default TaskList