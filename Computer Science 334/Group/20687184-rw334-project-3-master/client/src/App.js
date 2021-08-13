import React, { useState } from "react"
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import { createMuiTheme } from "@material-ui/core/styles"
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import GroupsPage from "./pages/GroupsPage"
import GroupPage from "./pages/GroupPage"
import { LoginPage } from "./pages/LoginPage"
import { LogoutPage } from "./pages/LogoutPage"
import ViewUser from "./components/ViewUser"  
import ProfilePage from "./pages/ProfilePage"
import TemporaryDrawer from "./components/TemporaryDrawer"
import { ProtectedRoute } from './components/ProtectedRoute';
import GlobalFeed from './pages/FeedPage';
import PostPage from './pages/PostPage'
import RegisterPage from "./pages/RegisterPage"
import { LoginButton } from "./components/LoginButton";
import SearchUsers from "./pages/SearchUsers";
import SearchGroups from "./pages/SearchGroups";
import CreateGroup from "./pages/CreateGroup";
import purple from '@material-ui/core/colors/purple';
import cyan from '@material-ui/core/colors/cyan';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: cyan[200],
    },
    secondary: {
      main: purple[200],
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    flexGrow: 1,
    color: "white",
    background: 'linear-gradient(45deg, #380137 10%, #1E6A81 90%)'
  },
  menuButton: {
    marginRight: "auto",
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  },
  loginbutton: {
    color: "white"
  }
}));

function App() {
  const classes = useStyles();

  const [isLoggedIn, setLoggedIn] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Router>
          <AppBar className={classes.appBar} position="fixed" elevation={0}>
            <Toolbar variant="dense">
              <TemporaryDrawer />
              <Typography variant="h6" className={classes.title}>
                [ GeoNet 🌎 ]
              </Typography>
              <LoginButton isLoggedIn={isLoggedIn} />
            </Toolbar>
          </AppBar>
          <Toolbar />
          <div className="App-body">
            <Switch>
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/login" render={(props) => (
                <LoginPage {...props} setLoggedIn={setLoggedIn} />
              )}>
              </Route>
              <Route exact path="/logout" render={(props) => (
                <LogoutPage {...props} setLoggedIn={setLoggedIn} />
              )}>
              </Route>
              <ProtectedRoute exact path="/search/users" component={SearchUsers} />
              <ProtectedRoute exact path="/search/groups" component={SearchGroups} />
              <ProtectedRoute exact path="/creategroup" component={CreateGroup} />
              <ProtectedRoute exact path="/viewuser/:uid/" component={ViewUser} />
              <ProtectedRoute exact path="/groups" component={GroupsPage} />
              <ProtectedRoute exact path="/groups/:gid/posts" component={GroupPage} />
              <ProtectedRoute exact path="/groups/:gid/post/:pid/" component={PostPage} />
              <ProtectedRoute exact path="/profile" component={ProfilePage} />
              <ProtectedRoute exact path="/global_feed" component={GlobalFeed} />
              <ProtectedRoute exact path="/post/:pid" component={PostPage} />
              <Route exact path="/">
                <Container>
                  <Typography variant="h4">Welcome to GeoNet!</Typography>
                </Container>
              </Route>
              <Route path="*">
                404 NOT FOUND
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
