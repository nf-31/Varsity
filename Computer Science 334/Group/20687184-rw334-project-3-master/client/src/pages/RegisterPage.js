import React from "react";
import { Link } from "react-router-dom";
import { TextField, Typography, Paper, Container, Button } from "@material-ui/core";
import { useState } from 'react';
import { register } from "../auth"

const RegisterPage = (props) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = () => {
    register(username, email, password, (successful) => {
      if (successful) {
        props.history.push("/login")
      } else {
        props.history.push("/register")
      }
    })
  }

  return (
    <Container>
      <Paper elevation={5} style={{ padding: 10 }}>
        <Typography variant="h6">Register</Typography>
        <TextField label='Username' placeholder='Enter username' value={username} onChange={handleChangeUsername} fullWidth required />
        <TextField label='Email' placeholder='Enter e-mail address' value={email} onChange={handleChangeEmail} fullWidth required />
        <TextField label='Password' placeholder='Enter password' type='password' value={password} onChange={handleChangePassword} fullWidth required />
        <Button style={{ marginTop: 10, marginBottom: 10}} type='submit' color='primary' variant="contained" onClick={handleRegister} fullWidth>Register</Button>
        <Typography>
          Already have an account?
          <Link to="/login">Login here!</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default RegisterPage;