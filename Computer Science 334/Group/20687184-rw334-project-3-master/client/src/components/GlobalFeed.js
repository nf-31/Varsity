import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Grid, CardContent, CardHeader, Typography, makeStyles, CardActions, Button, Avatar, Chip } from '@material-ui/core';
import GeoPopup from "../components/GeoPopup"

const helpers = require("../util/helpers")

const useStyles = makeStyles((theme) => ({
  postFeed: {
    // backgroundColor: 'blue',
    // maxWidth: '90%',
  },
  post: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
    background: '#9CDEE0',
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

const GlobalFeed = (props) => {
  const { posts } = props

  const classes = useStyles();

  console.log(posts)

  //**********************************************

  if (!posts || posts.length === 0) return (<Typography variant="h5">No posts.</Typography>);

  return (
    <Grid container direction="column" wrap="nowrap">
      {posts.map((post) =>
        <div key={post.pid}>
          <Grid item >
            <Card className={classes.post}>
              <Grid container direction="row" justify="space-between">
                <Grid item >
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
                    <Typography variant="body2" style={{ wordWrap: "break-word" }}>
                      {post.body}
                    </Typography>
                    {post.categories.map((category) =>
                      <Chip
                        key={category.cid}
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
      )}
    </Grid>
  )
}

export default GlobalFeed;