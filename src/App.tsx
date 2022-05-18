import { Container } from "@mui/material";
import { useState } from "react";
import DrawerComponent from "./components/common/DrawerComponent"
import NavBar from "./components/common/NavBar";
import SpeedDialComponent from "./components/common/SpeedDialComponent";
import Tasks from "./components/tasks/Tasks";

function App() {

    const [taskModalOpen, setTaskModalOpen] = useState(false);

    return (
        <div className="App">
            <Container fixed>
                <DrawerComponent>
                    <Tasks toogleModal={() => setTaskModalOpen(!taskModalOpen)} taskModalOpen={taskModalOpen}/>
                </DrawerComponent>
            </Container>
        </div>
    );
}

export default App;
