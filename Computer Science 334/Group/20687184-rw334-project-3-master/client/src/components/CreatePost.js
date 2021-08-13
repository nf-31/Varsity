import { makeStyles, Button, DialogActions, DialogContent, DialogTitle, TextField, Dialog, Typography, Container, Fab, IconButton, Chip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useState, useEffect } from 'react';

function CreatePost(props) {

	const { createPost } = props

	const useStyles = makeStyles((theme) => ({
		fab: {
			position: 'fixed',
			bottom: theme.spacing(2),
			right: theme.spacing(2),
		},
		chip: {
			marginLeft: theme.spacing(1),
			marginBottom: theme.spacing(1)
		}
	}));

	const classes = useStyles();

	const [location, setLocation] = useState(
		{
			loaded: false,
			longitude: null,
			latitude: null,
		}
	)

	const [showDialog, setShowDialog] = useState(false);

	const openDialog = () => {
		setShowDialog(true);
		getLocation();
	}

	const closeDialog = () => {
		setShowDialog(false);
		updateCategories([]);
		setCategoryText('');
	}

	const doPost = () => {
		// setRefresh(true) This change here makes the post work for now. I suppose this function can be moved later
		setShowDialog(false);
		getLocation()
		createPost({
			categories: categories,
			bodyText: postBody,
			geoTag: `${location.latitude} ${location.longitude}`,
		})
		updateCategories([]);
		setCategoryText('');
	}

	function getLocation() {
		navigator.geolocation.getCurrentPosition((position => {
			setLocation({
				loaded: true,
				longitude: position.coords.longitude,
				latitude: position.coords.latitude
			})
		}));
	}

	useEffect(() => {
		getLocation()
	}, [setLocation]);

	const [postBody, setPostBody] = useState("")

	
	const [categories, updateCategories] = useState([]);
	
	const [categoryText, setCategoryText] = useState('');
	
	const AddButton = () => (
		<IconButton onClick={() => addCategory(categoryText)}>
		  <AddIcon />
		</IconButton>
	)

	function addCategory(category) {
		if (category !== "") {
			updateCategories(categories => [...categories, category]);
		}	
	};

	function deleteCategory(deleted_category) {
		updateCategories(categories => categories.filter((category)=> category !== deleted_category));
	}

	return (
		<Container>
			<Dialog open={showDialog} fullWidth>
				<DialogTitle>Make a post on group</DialogTitle>
				<DialogContent>
					<Typography variant="body1">Lat: {location.latitude}, Lon: {location.longitude}</Typography>
					<TextField
						autoFocus
						margin="normal"
						fullWidth
						multiline
						variant="outlined"
						onChange={(event) => {setPostBody(event.target.value)}}
					/>
					<div>
						{categories.map((category) => 
							<Chip
								className={classes.chip}
								label={category}
								onDelete={() => deleteCategory(category)}
							/>
						)}
					</div>
					<div>
						<TextField
							error={categories.length < 3}
							helperText="Give at least three categories"
							variant="outlined"
							label="Category"
							margin="dense"
							onChange={(event) => {setCategoryText(event.target.value)}}
							InputProps={{ endAdornment: <AddButton /> }}
						/>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={doPost} disabled={categories.length < 3}>Post</Button>
					<Button onClick={closeDialog}>Cancel</Button>
				</DialogActions>
			</Dialog>
			<Fab className={classes.fab} color="primary" onClick={openDialog}><AddIcon /></Fab>
		</Container>
	)
}

export default CreatePost;