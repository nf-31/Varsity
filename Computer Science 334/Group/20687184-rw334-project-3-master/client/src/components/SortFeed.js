import React from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';

export default function SortFeed(props) {
  const { sorting, changeSorting } = props

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (selectedSort) => {
    changeSorting(selectedSort);
    setAnchorEl(null);
  }

  const sorting_options = [
    'time',
    // 'Nearest',
    'category',
    'group',
    'user'
  ]

  return (
    <div>
      <Button onClick={handleClick}>
        Sort by: {sorting}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {sorting_options.map((sorting) => (
          <MenuItem key={sorting_options.indexOf(sorting)} onClick={() => handleMenuClick(sorting)}>{sorting}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}