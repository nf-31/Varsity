import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import PublicIcon from '@material-ui/icons/Public';
import SearchIcon from '@material-ui/icons/Search';
import PageviewIcon from '@material-ui/icons/Pageview';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    isOpen: false
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ state, isOpen: open });
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link to='/' className={classes.link}>
          <ListItem button key="home">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link to='/global_feed' className={classes.link}>
          <ListItem button key="global_feed">
            <ListItemIcon><PublicIcon /></ListItemIcon>
            <ListItemText primary="Feed" />
          </ListItem>
        </Link>
        <Link to='/groups' className={classes.link}>
          <ListItem button key="groups">
            <ListItemIcon><GroupIcon /></ListItemIcon>
            <ListItemText primary="Group" />
          </ListItem>
        </Link>
        <Link to='/search/groups' className={classes.link}>
          <ListItem button key="search-groups">
            <ListItemIcon><PageviewIcon /></ListItemIcon>
            <ListItemText primary="Search Groups" />
          </ListItem>
        </Link>
        <Link to='/search/users' className={classes.link}>
          <ListItem button key="search-users">
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText primary="Search Users" />
          </ListItem>
        </Link>
        <Link to='/profile' className={classes.link}>
          <ListItem button key="profile">
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div>
        <IconButton onClick={toggleDrawer(true)} className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={state.isOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
    </div>
  );
}