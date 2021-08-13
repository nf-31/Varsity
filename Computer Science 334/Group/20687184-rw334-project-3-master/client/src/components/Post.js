import { React, useState } from 'react';
import { Card, Container, Grid, CardContent, Typography, makeStyles, TextField, IconButton, Avatar, CardHeader, CardActions, Chip } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import GeoPopup from "../components/GeoPopup";
import axios from "axios";

const helpers = require("../util/helpers")

const useStyles = makeStyles((theme) => ({
  post: {
    backgroundColor: '#9CDEE0',
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
  profilePicture: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  chip: {
    background: "#E2F5F7",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  }
}));


const Post = (props) => {
  const { post, setRefresh } = props

  const [commentText, setComment] = useState('')

  const classes = useStyles();

  const PostButton = () => (
    <IconButton onClick={handleComment}>
      <SendIcon />
    </IconButton>
  )

  const handleComment = () => {

    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const API_URL = `http://localhost:3001/api/posts/${post.pid}/comments`;

    axios.post(API_URL, { bodyText: commentText })
      .then(function () {
        setRefresh(true)
      })
      .catch(function (error) {
        setRefresh(true)
        console.error(error)
      })

  }

  if (!post) return <p>No post.</p>;

  return (
    <Container >
      <Card className={classes.post}>
        <Grid container direction="row" justify="space-between">
          <Grid item>
            {post.author ?
              <CardHeader
                avatar={
                  <Avatar
                    src={post.author.avatar_path}
                    alt={post.author.username}
                    className={classes.profilePicture}
                  />
                }
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
              <Container>
              <Typography variant="body2">
                {post.body}
              </Typography>
              </Container>
              {post.categories.map((category) =>
                <Chip
                  className={classes.chip}
                  label={category.type}
                />
              )}
            </CardContent>
          </Grid>
          <Grid item>
            <CardActions>
              <GeoPopup lat={parseInt(post.geo_tag.split(' ')[0])} lng={parseInt(post.geo_tag.split(' ')[1])} />
            </CardActions>
          </Grid>
        </Grid>
      </Card>
      <TextField
        fullWidth
        variant="outlined"
        label="Comment"
        multiline
        InputProps={{ endAdornment: <PostButton /> }}
        className={classes.commentbox}
        margin="dense"
        onChange={(event) => { setComment(event.target.value) }}
      />
      <Typography variant="h5">Comments:</Typography>
      <Grid container direction="column" wrap="nowrap">
        {post.comments.map(comment =>
          <div key={comment.cid}>
            <Grid item >
              <Card className={classes.comment}>
                {comment.comment_author ?
                  <CardHeader
                    avatar={
                      <Avatar
                        src={comment.comment_author.avatar_path}
                        alt={comment.comment_author.username}
                      />
                    }
                    title={comment.comment_author.username}
                    titleTypographyProps={{ variant: "h6" }}
                    subheader={helpers.unixToStr(comment.date_time)}
                  />
                  :
                  <CardHeader
                    title="Deleted"
                    titleTypographyProps={{ variant: "h5" }}
                    subheader={helpers.unixToStr(post.date_time)}
                  />}
                <CardContent>
                  <Typography variant="body1">
                    {comment.body}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </div>
        )}
      </Grid>
    </Container>
  )
}

export default Post;