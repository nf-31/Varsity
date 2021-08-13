import React from 'react';
import { Card, Button, CardHeader, Avatar, CardActions, Grid, CardContent, Typography, makeStyles, Chip } from '@material-ui/core';
import { Link } from "react-router-dom"
import GeoPopup from "../components/GeoPopup"

const helpers = require("../util/helpers")

const useStyles = makeStyles((theme) => ({
  postFeed: {
    // backgroundColor: 'blue',
    // maxWidth: '90%',
  },
  post: {
    backgroundColor: '#9CDEE0',
    padding: theme.spacing(2, 2, 2, 2),
    marginBottom: theme.spacing(1),
  },
  comment: {
    backgroundColor: '#E2F5F7',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  commentbox: {
    primaryColor: '#E2F5F7',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  geopopup: {
    marginLeft: "auto"
  },
  link: {
    textDecoration: 'none',
  },
  chip: {
    background: "#E2F5F7",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  }
}));

const Group = (props) => {
  const { group } = props

  const classes = useStyles();

  if (!group) return <p>No group.</p>;

  return (
    <Grid container direction="column"  wrap="nowrap">
      {(group.posts.length === 0) ? <Typography>No posts</Typography> :
        group.posts.map((post) =>
          <div key={post.pid}>
            <Grid item >
              <Card className={classes.post}>
                <Grid container direction="row" justify="space-between">
                  <Grid item>
                    {post.author ?
                      <CardHeader
                        avatar={<Avatar src={post.author.avatar_path} alt={post.author.username} />}
                        title={post.author.username}
                        titleTypographyProps={{ variant: "h5" }}
                        subheader={helpers.unixToStr(post.date_time)}
                      />
                      :
                      <CardHeader
                        title="Deleted"
                        titleTypographyProps={{ variant: "h5" }}
                        subheader={helpers.unixToStr(post.date_time)}
                      />}
                    <CardContent>
                      <Typography variant="body2">
                        {post.body}
                      </Typography>
                      {post.categories.map((category) =>
                        <Chip
                          className={classes.chip}
                          label={category.type}
                        />
                      )}
                    </CardContent>
                    <CardActions>
                      <Link className={classes.link} to={"post/" + post.pid} key={post.pid}>
                        <Button>View Post</Button>
                      </Link>
                      <GeoPopup lat={parseInt(post.geo_tag.split(' ')[0])} lng={parseInt(post.geo_tag.split(' ')[1])} />
                    </CardActions>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </div>
        )
      }
    </Grid>
  )
}

export default Group;