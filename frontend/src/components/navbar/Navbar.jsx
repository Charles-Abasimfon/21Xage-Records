import { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import './navbar.scss';

function Navbar() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chatCount, setChatCount] = useState(10);
  const [notificationCount, setNotificationCount] = useState(2);

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
            <ChatBubbleOutlineOutlinedIcon className='navbar-icon' />
            {chatCount > 0 && <div className='navbar-counter'>{chatCount}</div>}
          </div>
          <div className='item navbar-icon-container'>
            <ListOutlinedIcon className='navbar-icon' />
          </div>
          <div className='item'>
            <img
              src='https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?cs=srgb&dl=pexels-mateus-souza-3586798.jpg&fm=jpg'
              alt=''
              className='navbar-user-avatar'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
