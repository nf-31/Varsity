import React from 'react';
import Popover from '@material-ui/core/Popover';
import PublicIcon from '@material-ui/icons/Public';
import IconButton from '@material-ui/core/IconButton';
import Box from "@material-ui/core/Box"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

const containerStyle = {
  width: '400px',
  height: '400px'
};



export default function GeoPopup(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const center = {
    lat: props.lat,
    lng: props.lng
  };

  return (
    <div>
      <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
        <PublicIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Box width={400} height={400} > 
          <LoadScript googleMapsApiKey="AIzaSyB4Iv8u8OXePZpv5XXqn_4ek328YsOyw9o" mapIds={["ae84a393d0289081"]}>
            <GoogleMap
              clickableIcons={false}
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              
              options={{ mapId: "ae84a393d0289081" }}
            >
              <Marker
                position={center}
              />
            </GoogleMap>
          </LoadScript></Box>
      </Popover>
    </div>
  );
}