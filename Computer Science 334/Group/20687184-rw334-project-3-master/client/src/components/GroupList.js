import React from 'react';
import Typography from "@material-ui/core/Typography"
import { Card, Button, Grid, CardActions, CardHeader } from "@material-ui/core"
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // css
  link: {
    textDecoration: 'none',
  },
  group: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    background: '#9CDEE0',
  }

}));

const GroupList = (props) => {
  const { groups } = props

  const classes = useStyles();

  if (!groups || groups.length === 0) return (<Typography variant="h5">No groups.</Typography>);

  return (
    <Grid container direction="column">
      {groups.map((group) =>
        <Grid item key={group.gid}>
          <Card className={classes.group}>
            <CardHeader
              title={group.name}
              titleTypographyProps={{ variant: "h5" }}
            />
            <CardActions>
              <Link className={classes.link} to={`groups/${group.gid}/posts`} key={group.gid}>
                <Button>View Group</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}


export default GroupList;