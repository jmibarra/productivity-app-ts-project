import React, { Dispatch, SetStateAction, useState } from "react";

import { TextField, Button, Grid, Stack, Box } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import Cookies from "js-cookie";
import { properties } from "../../properties";
import { ItemHeader, Item, ItemMessage } from "./LoginStyles";

interface LoginResponse {
    authentication: {
        sessionToken: string
    };
}

interface Props {
    isLoggedIn: Boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Login = ({isLoggedIn, setIsLoggedIn}:Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [success, setSuccess] = useState(false);

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
        const response = await fetch(properties.api_url+"/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        
        if(response.ok){
            const data: LoginResponse = await response.json();
            Cookies.set("PROD-APP-AUTH", data.authentication.sessionToken);
            setIsLoggedIn(true);
            setSuccess(true);
        }else{  
            setError(true);
            if(response.statusText === "Forbidden")
                setErrorMessage("Las credenciales ingresadas no son válidas")
            else
                setErrorMessage(response.statusText)
        }
    };

    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center">
                <ItemHeader>
                    <h1>Login</h1>
                </ItemHeader>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Item>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Login
                            </Button>
                            </Grid>
                        </Grid>
                        </form>
                    </Grid>
                    </Grid>
                </Item>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                { 
                    (error || success) && <ItemMessage>
                        <Stack spacing={2} >
                            {error && <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {errorMessage}
                            </Alert> }
                            {success && <Alert severity="success">
                                <AlertTitle>Success</AlertTitle>
                                Se inicia la sesión correctamente
                            </Alert>}
                        </Stack>
                    </ItemMessage> 
                }
            </Box>
        </>
    );
};

export default Login;
