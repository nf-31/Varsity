import React from 'react';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    // css
    button: {
		backgroundColor: '#9CDEE0',
		'&:hover': {
			backgroundColor: '#66CACC',
			borderColor: '#0062cc',
			boxShadow: 'none',
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#66CACC',
			borderColor: '#005cbf',
		}
	},
    group: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      background: '#9CDEE0',
    }
  
  }));

function CreateGroup(props) {
    const classes = useStyles()

    const { isLoading, setNewGroup } = props

    const [name, setName] = useState('')

    const handleChange = e => {
        setName(e.target.value)
    }

    const handleCreateGroup = () => {

        const token = localStorage.getItem("token")
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const API_URL = `http://localhost:3001/api/groups`;

        axios.post(API_URL, { groupName: name })
            .then(function() {
                setNewGroup(true)
            })
            .catch(function (error) {
                console.error(error)
            })
    }

    if (isLoading) return <div></div>

    return (
        <div>
            <form style={{ margin: '50px' }}>
                <Grid container direction='column' alignItems='center' justify='center'>
                    <Typography variant='h6' style={{ margin: '10px' }}>Create a new group</Typography>
                    <TextField onChange={handleChange} value={name} label='Group name' variant='outlined' required={true} style={{ margin: '5px' }} />
                    <Button className={classes.button} onClick={handleCreateGroup} variant='contained' style={{ margin: '5px' }}>Create group</Button>
                </Grid>
            </form>
        </div>

    )
};

export default CreateGroup;
