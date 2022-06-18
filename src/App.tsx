import { Routes, Route, Link } from "react-router-dom";
import { Container } from "@mui/material";
import DrawerComponent from "./components/common/DrawerComponent"
import Tasks from "./components/tasks/Tasks";
import Habits from "./components/habits/Habits";
import Notes from "./components/notes/Notes";

function App() {

    return (
        <div className="App">
            <Container>
                <DrawerComponent>
                    <Routes>
                        <Route path="/" element={<Tasks/>} />
                        <Route path="/todos" element={<Tasks/>} />
                        <Route path="/notes" element={<Notes/>} />
                        <Route path="/habits" element={<Habits/>} />
                    </Routes>
                </DrawerComponent>
            </Container>
        </div>
    );
}

export default App;
