import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import IconButton from '@material-ui/core/IconButton'


const RightMenu = () => {

  const [isLoged, setIsLoged] = useState("/")
  const [isLoged_, setIsLoged_] = useState("/")

  useEffect(() => {
    setIsLoged(localStorage.getItem('token') ? "account" : "login")
    setIsLoged_(localStorage.getItem('token') ? "logout" : "register")
  })

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>

      <IconButton aria-label="account of current user" onClick={handleClick} color="inherit">
        <AccountCircleOutlinedIcon />
      </IconButton>
      <Menu
        id="accont-menu"
        anchorEl={anchorEl}

        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link href={isLoged}>
            <a>{isLoged}</a>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href={isLoged_}>
            <a>{isLoged_}</a>
          </Link>
        </MenuItem>
      </Menu>

    </>

  );

}

export default RightMenu;

