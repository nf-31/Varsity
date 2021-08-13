import React from "react"
import { Link } from "react-router-dom"
import { Button, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
    color: 'white'
  },
  loginbutton: {
    color: "white"
  }
}));

export const LoginButton = (props) => {
  const classes = useStyles()

  const { isLoggedIn } = props

  if (!isLoggedIn) {
    return (
      <Link to='/login' className={classes.link} color='inherit'>
        <Button className={classes.loginbutton}>
          Login
        </Button>
      </Link>
    )
  } else {
    return (
      <Link to='/logout' className={classes.link} color='inherit'>
        <Button className={classes.loginbutton}>
          Logout
        </Button>
      </Link>
    )
  }
}


