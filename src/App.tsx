import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Tasks from "./components/tasks/Tasks";
import DrawerComponent from "./components/common/Drawer/DrawerComponent";
import Habits from "./components/habits/Habits";
import Notes from "./components/notes/Notes";
import Login from "./components/login/Login";
import { useEffect, useState } from "react";
import Register from "./components/register/Register";
import ProtectedRoute from "./components/login/ProtectedRoute";
import ConfigurationPageComponent from "./components/configuration/ConfigurationPageComponent";
import UserProfileComponent from "./components/userProfile/UserProfileComponent";
import MetricsBoardComponent from "./components/metrics/MetricsBoardComponent";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(
		localStorage.getItem("PROD-APP-AUTH") ? true : false
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
								path="/metrics"
								element={
									<ProtectedRoute isLoggedIn={isLoggedIn}>
										<MetricsBoardComponent />
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
