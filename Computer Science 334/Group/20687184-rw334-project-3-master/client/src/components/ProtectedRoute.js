import React from "react"
import { Route, Redirect } from "react-router-dom"
import { isLoggedIn } from "../auth"

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={
      (props) => {
        if (isLoggedIn()) {
          return <Component {...props} />
        } else {
          return <Redirect to={
            {
              pathname: "/",
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}
