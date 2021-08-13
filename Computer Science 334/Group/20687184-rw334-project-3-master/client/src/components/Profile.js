import React from 'react';
import { Avatar, Button, Container, makeStyles, TextField, Dialog, DialogTitle, DialogActions, DialogContent, Typography, InputBase, Divider } from '@material-ui/core';
import axios from "axios"

const useStyles = makeStyles((theme) => ({
	profilePicture: {
		width: theme.spacing(15),
		height: theme.spacing(15),
		marginBottom: theme.spacing(2),
	},
	passwordButton: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	submitButton: {
		marginRight: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	deleteButton: {
		marginRight: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	uploadButton: {
		marginRight: theme.spacing(2),
		marginBottom: theme.spacing(2)
	}
}));

const Profile = (props) => {
	const { profile, setRefresh } = props

	const classes = useStyles();

	const [viewOnly, setEditable] = React.useState(true)
	const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
	const [showPasswordDialog, setShowPasswordDialog] = React.useState(false);
	const [image, setImage] = React.useState(null);
	const [password, setPassword] = React.useState("");
	const [username, setUsername] = React.useState("");
	const [email, setEmail] = React.useState("");

	// Doesn't work yet...
	const handlePfpUpload = () => {

		const formData = new FormData();

		formData.append("profile_pic", image);

		const token = localStorage.getItem("token")
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		const API_URL = `http://localhost:3001/api/upload-profile-pic`;

		axios.post(API_URL, formData, { headers: { "Content-Type": "multipart/form-data" } })
			.then(function () {
				setRefresh(true)
				console.log("Success")
			})
			.catch(function (error) {
				setRefresh(true)
				console.error(error)
			})
	}

	const handleUsernameChange = () => {

		const token = localStorage.getItem("token")
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		const API_URL = `http://localhost:3001/api/update/username`;

		if (username !== "" && username != null) {
			axios.patch(API_URL, { "newUsername": username })
				.then(function (response) {
					setRefresh(true)
					console.log(response.status)
				})
				.catch(function (error) {
					setRefresh(true)
					console.error(error)
					if (error.response.status === 400) {
						alert("That username is already taken")
					}
				})
		}
	}

	const handleEmailChange = () => {

		const token = localStorage.getItem("token")
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		const API_URL = `http://localhost:3001/api/update/email`;

		if (email !== "" && email != null) {
			axios.patch(API_URL, { "email": email })
				.then(function () {
					setRefresh(true)
					console.log("Success")
				})
				.catch(function (error) {
					setRefresh(true)
					console.error(error)
					if (error.response.status === 400) {
						alert("That email is already taken")
					}
				})
		}
	}

	const handlePasswordChange = () => {

		const token = localStorage.getItem("token")
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		const API_URL = `http://localhost:3001/api/update/password`;

		axios.post(API_URL, { "password": password })
			.then(function () {
				setRefresh(true)
				console.log("Success")
			})
			.catch(function (error) {
				setRefresh(true)
				console.error(error)
			})
	}

	const handleAccountDelete = () => {

		const token = localStorage.getItem("token")
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		const API_URL = `http://localhost:3001/api/delete`;

		axios.delete(API_URL)
			.then(function () {
				console.log("Success")
				window.location.replace("/")
				// logout((successful) => {
				// 	if (successful) {
				// 	}
				// })
			})
			.catch(function (error) {
				setRefresh(true)
				console.error(error)
			})
	}

	if (!profile) return <p>No user.</p>;

	return (
		<div>
			<Container>
				<div>
					<Avatar className={classes.profilePicture} src={profile.avatar_path} />
					{!viewOnly &&
						<form>
							<InputBase
								type="file"
								accept="image/*"
								onChange={(e) => setImage(e.target.files[0])}
							/>
							<Button
								color="primary"
								className={classes.uploadButton}
								variant="contained"
								onClick={handlePfpUpload}
							>
								Upload Profile Picture
							</Button>
							<Divider />
						</form>
					}
				</div>
				<TextField
					label="User Name"
					variant="outlined"
					defaultValue={profile.username}
					InputProps={{ readOnly: viewOnly }}
					fullWidth
					onChange={(e) => setUsername(e.target.value)}
					margin="normal"
				/>
				{!viewOnly &&
					<div>
						<Button
							color="primary"
							onClick={handleUsernameChange}
							className={classes.uploadButton}
							variant="contained"
						>
							Change username
						</Button>
						<Divider />
					</div>
				}
				<TextField
					label="Email"
					variant="outlined"
					defaultValue={profile.email}
					InputProps={{ readOnly: viewOnly }}
					fullWidth
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					margin="normal"
				/>
				{!viewOnly &&
					<div>
						<Button
							color="primary"
							onClick={handleEmailChange}
							className={classes.uploadButton}
							variant="contained"
						>
							Change email
						</Button>
						<Divider />
					</div>
				}
				<div>
					{viewOnly &&
						<Button
							onClick={() => setEditable(!viewOnly)}
							color="primary"
							className={classes.editButton}
							variant="contained"
						>
							Edit profile
						</Button>
					}
					{!viewOnly &&
						<div>
							<Button
								color="primary"
								onClick={() => setShowPasswordDialog(true)}
								className={classes.passwordButton}
								variant="contained"
							>
								Change password
							</Button>
							<div>
								<Button onClick={() => setShowDeleteDialog(true)} variant="contained" color="primary" className={classes.deleteButton}>Delete account</Button>
							</div>
							<Button onClick={() => setEditable(!viewOnly)} className={classes.cancelButton} color="secondary" variant="contained">Cancel</Button>
						</div>}
				</div>
				<Dialog open={showDeleteDialog} fullWidth>
					<DialogTitle>Are you sure you'd like to delete your account?</DialogTitle>
					<DialogContent>
						<Typography variant="body1">Deleting your account is permanent.</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleAccountDelete}>Delete account</Button>
						<Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
					</DialogActions>
				</Dialog>

				<Dialog open={showPasswordDialog} fullWidth>
					<DialogTitle>Enter your new password</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="normal"
							fullWidth
							variant="outlined"
							onChange={(event) => { setPassword(event.target.value) }}
							type="password"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handlePasswordChange}>Change password</Button>
						<Button onClick={() => setShowPasswordDialog(false)}>Cancel</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</div>
	)
}

export default Profile;