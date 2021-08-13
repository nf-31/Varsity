import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardActions, Button, Typography, Avatar, Grid, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

class SearchUsers extends Component {
  state = {
    term: '',
    output: [],
    addfriend: 'Add friend',
    removefriend: 'Remove friend',
    friend: '',
    length: 0
  }

  // When the search button is clicked, it returns all the users that match the search term
  handleClick = () => {
    axios.get('http://localhost:3001/api/users/search/' + this.state.term)
      .then((response) => this.setState({ output: response.data }))
  }

  // When the text in the input box is changed
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const {
      term
    } = this.state;

    return (

      <Grid container direction="row" alignItems="center" justify="center" style={{ margin: '20px' }}>

        <TextField size='small' label="Search for user" variant="outlined" name="term" onChange={this.handleChange} value={term} />
        <IconButton onClick={this.handleClick} style={{ margin: '5px' }}>
          <SearchIcon />
        </IconButton>

        <Grid container direction="row" alignItems="center" justify="center">

          {(this.state.output).map((data, index) => {
            return <div key={index}>

              <Card variant='outlined'
                style={{
                  height: '220px',
                  width: '200px',
                  margin: '20px',
                }}
              >
                <Grid container direction="column" alignItems="center" justify="center">
                  <Avatar
                    style={{
                      height: '100px',
                      width: '100px',
                      margin: '20px'
                    }}
                    src={data.avatar_path}
                  />

                  <Typography>{data.username}</Typography>

                  <CardActions>
                    {
                      // Links to the profile of the user (not the current user)
                    }
                    <Link to={`/viewuser/${data.uid}`} style={{ textDecoration: 'none' }}>
                      <Button variant='contained' color='primary' size='small'>
                        View profile
                      </Button>
                    </Link>
                  </CardActions>

                </Grid>
              </Card>

            </div>
          })}
        </Grid>
      </Grid>

    );
  }
}

export default SearchUsers;
