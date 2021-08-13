import React from 'react';
import { logout } from "../auth"
import { Typography, Paper, Container, Button } from "@material-ui/core";

export const LogoutPage = (props) => {
  const { setLoggedIn } = props

  const handleLogout = () => {
    logout((successful) => {
      if (successful) {
        setLoggedIn(false)
        props.history.push("/")
      } else {
        setLoggedIn(false)
        props.history.push("/")
      }
    })
  }

  return (
    <Container>
      <Paper elevation={5} style={{ padding: 10 }}>
        <Typography variant="h4">Logout</Typography>
        <Typography>Are you sure you'd like to logout?</Typography>
        <Button type='submit' color='primary' variant="contained" onClick={handleLogout} fullWidth>Logout</Button>
      </Paper>
    </Container>
  );
};
