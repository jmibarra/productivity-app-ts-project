import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import Tasks from "./components/tasks/Tasks";
import DrawerComponent from "./components/common/Drawer/DrawerComponent"
import Habits from "./components/habits/Habits";
import Notes from "./components/notes/Notes";
import Login from "./components/login/Login";
import { useState } from "react";
import Cookies from "js-cookie";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('PROD-APP-AUTH'));
    
    return (
        <div className="App">
            <Container>
                <DrawerComponent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                    <Routes>
                        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                        {isLoggedIn && (
                            <>
                                <Route path="/" element={<Tasks/>} />
                                <Route path="/todos" element={<Tasks/>} />
                                <Route path="/notes" element={<Notes/>} />
                                <Route path="/habits" element={<Habits/>} />
                            </>
                        )}
                    </Routes>
                </DrawerComponent>
            </Container>
        </div>
    );
}

export default App;
