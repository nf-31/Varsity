import React, { useState } from 'react';
import { login } from "../auth"
import { Link } from "react-router-dom";
import { TextField, Typography, Paper, Container, Button } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export const LoginPage = (props) => {
  const { setLoggedIn } = props

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRemember] = useState(false)

  const handleRememberMeChange = (event) => {
    setRemember(event.target.checked);
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    login(username, password, rememberMe, (successful) => {
      if (successful) {
        setLoggedIn(true)
        props.history.push("/global_feed")
      } else {
        props.history.push("/login")
      }
    })
  }

  return (
    <Container>
      <Paper elevation={5} style={{ padding: 10}}>
          <Typography variant="h4">Login</Typography>
        <TextField label='Username' placeholder='Enter username' value={username} onChange={handleChangeUsername} fullWidth required />
        <TextField label='Password' placeholder='Enter password' type="password" value={password} onChange={handleChangePassword} fullWidth required />
        <FormControlLabel
          control={
            <Checkbox
              name="checkedB"
              color="primary"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
          }
          label="Remember me"
        />
        <Button type='submit' color='primary' variant="contained" onClick={handleLogin} fullWidth>Login</Button>
        <Typography variant="body1" style={{ marginTop: 10 }}>
          Don't already have an account?
          <Link to="/register" style={{ marginLeft: 5 }}>Register here!</Link>
        </Typography>
      </Paper>
    </Container>
  );
};
