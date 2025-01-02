import React, { useState } from "react";
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

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [success, setSuccess] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		setError(false);
		setSuccess(false);
		event.preventDefault();

		const response = await fetch(properties.api_url + "/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password, username, fullName }),
		});

		if (response.ok) {
			setSuccess(true);
			setTimeout(() => {
				navigate("/login");
			}, 1500);
		} else {
			setError(true);
			const errorData = await response.json();
			setErrorMessage(errorData.message || "Error al registrar usuario");
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
					Crear Cuenta
				</Typography>

				<Stack spacing={2}>
					<TextField
						fullWidth
						variant="outlined"
						label="Nombre Completo"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						autoComplete="name"
					/>
					<TextField
						fullWidth
						variant="outlined"
						label="Nombre de Usuario"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						autoComplete="username"
					/>
					<TextField
						fullWidth
						variant="outlined"
						label="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						autoComplete="email"
					/>
					<TextField
						fullWidth
						variant="outlined"
						label="Contraseña"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="new-password"
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
						Registrarse
					</Button>
					<Typography variant="overline" align="center" gutterBottom>
						¿Ya tienes cuenta?
					</Typography>
					<Button
						variant="text"
						onClick={() => {
							navigate("/login");
						}}
					>
						Iniciar Sesión
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
									Usuario registrado correctamente
								</Typography>
							</Alert>
						)}
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Register;
