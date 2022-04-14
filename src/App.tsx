import { useReducer } from "react";
import { ReducerActionType } from "./actions/tasks";
import { tasksReducer,initialState } from "./reducers/tasks";
import TaskForm from "./tasks/components/TaskForm";
import TaskList from "./tasks/components/TaskList";
import { Task } from "./tasks/interfaces/interfaces";

function App() {
    const [state, dispatch] = useReducer(tasksReducer,initialState)

    const addTask = (task:Task):void => {
        dispatch({type: ReducerActionType.SET_TASK,payload:task})
    }
    return (
        <div className="App">
            <TaskForm addTask={addTask}/>
            <TaskList tasks={state.tasks}/>
        </div>
    );
}

export default App;
