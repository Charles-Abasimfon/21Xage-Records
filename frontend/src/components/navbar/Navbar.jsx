import { useState, useContext, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/dark_mode/darkModeContext';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import fscreen from 'fscreen';
import { AuthContext } from '../../context/authContext/AuthContext';
import { logout } from '../../context/authContext/AuthActions';
import './navbar.scss';

function Navbar(props) {
  const navigate = useNavigate();
  const { appRef } = props;
  const menuContainerRef = useRef();
  const { darkMode, dispatch } = useContext(DarkModeContext);
  const { dispatch: authDispatch, admin } = useContext(AuthContext);

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

  /* FOR FULLSCREEN MODE */
  const [inFullscreenMode, setInFullscreenMode] = useState(false);

  const handleFullscreenChange = useCallback((e) => {
    let change = '';
    if (fscreen.fullscreenElement !== null) {
      change = 'Entered fullscreen mode';
      setInFullscreenMode(true);
    } else {
      change = 'Exited fullscreen mode';
      setInFullscreenMode(false);
    }
    console.log(change, e);
  }, []);

  const handleFullscreenError = useCallback((e) => {
    console.log('Fullscreen Error', e);
  }, []);

  useEffect(() => {
    if (fscreen.fullscreenEnabled) {
      fscreen.addEventListener(
        'fullscreenchange',
        handleFullscreenChange,
        false
      );
      fscreen.addEventListener('fullscreenerror', handleFullscreenError, false);
      return () => {
        fscreen.removeEventListener('fullscreenchange', handleFullscreenChange);
        fscreen.removeEventListener('fullscreenerror', handleFullscreenError);
      };
    }
  });

  const appElement = appRef;

  const toggleFullscreen = useCallback(() => {
    if (inFullscreenMode) {
      fscreen.exitFullscreen();
    } else {
      fscreen.requestFullscreen(appElement.current);
    }
  }, [inFullscreenMode]);
  /* -------------- */

  const handleOpenProfile = () => {
    navigate('/profile', { replace: true });
    handleClose();
  };

  return (
    <div className='navbar' ref={menuContainerRef}>
      <div className='wrapper'>
        <div className='search'>
          <input type='text' placeholder='Search here ...' />
          <SearchOutlinedIcon className='navbar-search-icon' />
        </div>
        <div className='items'>
          <div className='item navbar-icon-container'>
            {darkMode ? (
              <DarkModeOutlinedIcon
                className='navbar-icon'
                onClick={() => dispatch({ type: 'LIGHT_MODE' })}
              />
            ) : (
              <LightModeOutlinedIcon
                className='navbar-icon'
                onClick={() => dispatch({ type: 'DARK_MODE' })}
              />
            )}
          </div>
          <div className='item navbar-icon-container'>
            {inFullscreenMode ? (
              <FullscreenExitOutlinedIcon
                className='navbar-icon'
                onClick={toggleFullscreen}
              />
            ) : (
              <FullscreenOutlinedIcon
                className='navbar-icon'
                onClick={toggleFullscreen}
              />
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
            <span className='user-name'>{admin.name}</span>
            <KeyboardArrowDownOutlinedIcon className='user-icon' />
          </div>
        </div>
      </div>

      {/* MENU */}
      <Menu
        container={menuContainerRef.current}
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleOpenProfile}>My Profile</MenuItem>
        <MenuItem onClick={() => authDispatch(logout())}>Logout</MenuItem>
      </Menu>
      {/*  */}
    </div>
  );
}

export default Navbar;
