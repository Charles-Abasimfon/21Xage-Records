import { useState } from 'react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './navbar.scss';

function Navbar() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chatCount, setChatCount] = useState(10);
  const [notificationCount, setNotificationCount] = useState(2);

  /* FOR ACCOUNT MENU */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  /* ------------- */

  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='search'>
          <input type='text' placeholder='Search here ...' />
          <SearchOutlinedIcon className='navbar-search-icon' />
        </div>
        <div className='items'>
          <div className='item navbar-icon-container'>
            <DarkModeOutlinedIcon className='navbar-icon' />
          </div>
          <div className='item navbar-icon-container'>
            {isFullscreen ? (
              <FullscreenExitOutlinedIcon className='navbar-icon' />
            ) : (
              <FullscreenOutlinedIcon className='navbar-icon' />
            )}
          </div>
          <div className='item navbar-icon-container'>
            <NotificationsNoneOutlinedIcon className='navbar-icon' />
            {notificationCount > 0 && (
              <div className='navbar-counter'>{notificationCount}</div>
            )}
          </div>
          <div className='item navbar-icon-container'>
            <LocalPostOfficeOutlinedIcon className='navbar-icon' />
            {chatCount > 0 && <div className='navbar-counter'>{chatCount}</div>}
          </div>
          <div className='item navbar-icon-container'>
            <ListOutlinedIcon className='navbar-icon' />
          </div>
          <div className='item user' aria-haspopup='true' onClick={handleClick}>
            <span className='user-name'>Abasimfon Charles</span>
            <KeyboardArrowDownOutlinedIcon className='user-icon' />
          </div>
        </div>
      </div>

      {/* MENU */}
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>My Profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      {/*  */}
    </div>
  );
}

export default Navbar;
