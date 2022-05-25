import { Container } from "@mui/material";
import DrawerComponent from "./components/common/DrawerComponent"
import Tasks from "./components/tasks/Tasks";

function App() {

    return (
        <div className="App">
            <Container>
                <DrawerComponent>
                    <Tasks/>
                </DrawerComponent>
            </Container>
        </div>
    );
}

export default App;
