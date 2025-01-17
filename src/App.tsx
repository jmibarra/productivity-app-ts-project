import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Tasks from "./components/tasks/Tasks";
import DrawerComponent from "./components/common/Drawer/DrawerComponent";
import Habits from "./components/habits/Habits";
import Notes from "./components/notes/Notes";
import Login from "./components/login/Login";
import { useState } from "react";
import Cookies from "js-cookie";
import Register from "./components/register/Register";
import ProtectedRoute from "./components/login/ProtectedRoute";
import ConfigurationPageComponent from "./components/configuration/ConfigurationPageComponent";
import UserProfileComponent from "./components/userProfile/UserProfileComponent";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!Cookies.get("PROD-APP-AUTH")
	);

	return (
		<div className="App">
			<Container>
				<DrawerComponent
					isLoggedIn={isLoggedIn}
					setIsLoggedIn={setIsLoggedIn}
				>
					<Routes>
						<Route
							path="/login"
							element={
								<Login
									isLoggedIn={isLoggedIn}
									setIsLoggedIn={setIsLoggedIn}
								/>
							}
						/>
						<Route path="/register" element={<Register />} />

						<>
							<Route
								path="/"
								element={
									<ProtectedRoute isLoggedIn={isLoggedIn}>
										<Tasks />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/todos"
								element={
									<ProtectedRoute isLoggedIn={isLoggedIn}>
										<Tasks />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/notes"
								element={
									<ProtectedRoute isLoggedIn={isLoggedIn}>
										<Notes />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/habits"
								element={
									<ProtectedRoute isLoggedIn={isLoggedIn}>
										<Habits />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/config"
								element={
									<ProtectedRoute isLoggedIn={isLoggedIn}>
										<ConfigurationPageComponent />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/profile"
								element={
									<ProtectedRoute isLoggedIn={isLoggedIn}>
										<UserProfileComponent />
									</ProtectedRoute>
								}
							/>
						</>
					</Routes>
				</DrawerComponent>
			</Container>
		</div>
	);
}

export default App;
