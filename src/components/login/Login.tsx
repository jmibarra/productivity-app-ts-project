import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	TextField,
	Button,
	Box,
	Typography,
	Alert,
	Stack,
} from "@mui/material";
import { properties } from "../../properties";

interface Props {
	isLoggedIn: Boolean;
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Login = ({ isLoggedIn, setIsLoggedIn }: Props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [success, setSuccess] = useState(false);

	const navigate = useNavigate();

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		setError(false);
		setSuccess(false);
		event.preventDefault();
		const response = await fetch(properties.api_url + "/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
			credentials: "include",
		});

		if (response.ok) {
			const data = await response.json();
			setIsLoggedIn(true);
			setSuccess(true);
			localStorage.setItem(
				"PROD-APP-AUTH",
				data.authentication.sessionToken
			);
			setTimeout(() => {
				navigate("/");
			}, 1000);
		} else {
			setError(true);
			setErrorMessage(
				response.statusText === "Forbidden"
					? "Las credenciales ingresadas no son válidas"
					: response.statusText
			);
		}
	};

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="100vh"
			bgcolor="background.default"
			p={3}
		>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{
					width: { xs: "90%", sm: "400px" },
					p: 4,
					borderRadius: 2,
					boxShadow: 3,
					bgcolor: "background.paper",
				}}
			>
				<Typography variant="h4" align="center" gutterBottom>
					Iniciar Sesión
				</Typography>

				<Stack spacing={2}>
					<TextField
						fullWidth
						variant="outlined"
						label="Email"
						value={email}
						onChange={handleEmailChange}
						autoComplete="email"
					/>
					<TextField
						fullWidth
						variant="outlined"
						label="Contraseña"
						type="password"
						value={password}
						onChange={handlePasswordChange}
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						size="large"
						sx={{
							textTransform: "none",
							fontWeight: "bold",
						}}
					>
						Login
					</Button>
					<Typography variant="overline" align="center" gutterBottom>
						¿No tienes cuenta?
					</Typography>

					<Button
						variant="text"
						onClick={() => {
							navigate("/register");
						}}
					>
						Registrarse
					</Button>
				</Stack>

				{(error || success) && (
					<Box mt={2}>
						{error && (
							<Alert severity="error">
								<Typography>{errorMessage}</Typography>
							</Alert>
						)}
						{success && (
							<Alert severity="success">
								<Typography>
									Sesión iniciada correctamente
								</Typography>
							</Alert>
						)}
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Login;
