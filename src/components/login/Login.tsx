import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import Cookies from "js-cookie";
import { properties } from "../../properties";
import { ItemHeader, Item } from "../notes/styles/NotesStyles";

interface LoginResponse {
    authentication: {
        sessionToken: string
    };
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Login")
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
    const data: LoginResponse = await response.json();
    console.log(data.authentication.sessionToken)
    Cookies.set("PROD-APP-AUTH", data.authentication.sessionToken);
  };

  return (
    <>
        <ItemHeader><h1>Login</h1></ItemHeader>
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
    </>
  );
};

export default Login;
