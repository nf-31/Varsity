import React from 'react';
import Popover from '@material-ui/core/Popover';
import { Box, Avatar, Button, Typography, makeStyles } from "@material-ui/core"


export default function ProfilePopup(props) {

	const useStyles = makeStyles((theme) => ({
		popOver: {
			padding: theme.spacing(2,2,2,2),
		},
		addButton: {
			backgroundColor: '#9CDEE0',
			marginTop: theme.spacing(1),
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
		}
	  }));

	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div>
			<div onClick={handleClick}>
				<Avatar
					src={props.avatar_url}
					alt={props.user}
				/>
			</div>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<Box className={classes.popOver}>
					<Typography>
						Add {props.user} as friend?
					</Typography>
					<Button className={classes.addButton}>Add</Button>
				</Box>
			</Popover>
		</div>
	);
}