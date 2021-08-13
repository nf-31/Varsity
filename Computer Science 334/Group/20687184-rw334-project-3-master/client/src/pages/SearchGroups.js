import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardActions, Button, Typography, Grid, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


class SearchGroups extends Component {
  state = {
    term: '',
    output: []
  }

  handleClick = () => {
    axios.get('http://localhost:3001/api/groups/' + this.state.term)
      .then((response) => this.setState({ output: response.data }))
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const {
      term
    } = this.state;

    return (
      <div>
        <Grid container direction="row" alignItems="center" justify="center">

          <TextField size='small' label="Search for group" variant="outlined" name="term" onChange={this.handleChange} value={term} />

          <IconButton onClick={this.handleClick} style={{ margin: '5px' }}>
            <SearchIcon />
          </IconButton>

          <Grid container direction="row" alignItems="center" justify="center">

            {(this.state.output).map((data, index) => {
              return <div key={index}>
                <Card variant='outlined'
                  style={{
                    height: '80px',
                    width: '150px',
                    margin: '20px',
                    padding: '20px'
                  }}
                >
                  <Grid container direction="column" alignItems="center" justify="center">

                    <Typography>{data.name}</Typography>

                    <CardActions>

                      {
                        // Link to the group page 
                      }
                      <Link to={`/groups/${data.gid}/posts`} style={{ textDecoration: 'none' }}>
                        <Button variant='contained' color='primary' size='small'>
                          View group
                        </Button>
                      </Link>
                    </CardActions>

                  </Grid>
                </Card>

              </div>
            })}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SearchGroups;
