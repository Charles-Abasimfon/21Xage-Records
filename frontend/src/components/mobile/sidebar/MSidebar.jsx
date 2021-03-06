import { NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { DarkModeContext } from '../../../context/dark_mode/darkModeContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AddTaskIcon from '@mui/icons-material/AddTask';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import logo from '../../../assets/logo/21xage.webp';
import CustomScroll from 'react-custom-scroll';
import { AuthContext } from '../../../context/authContext/AuthContext';
import { logout } from '../../../context/authContext/AuthActions';
import 'react-custom-scroll/dist/customScroll.css';
import './msidebar.scss';

function MSidebar({ displayMSidebar, setDisplayMSidebar }) {
  const { dispatch } = useContext(DarkModeContext);
  const { admin, dispatch: authDispatch } = useContext(AuthContext);

  const closeSidebar = () => {
    setDisplayMSidebar(false);
  };

  return (
    <div className={`mobile-sidebar ${displayMSidebar && 'enter'}`}>
      <div className='sidebar-top'>
        <div className='logo'>
          <a href='/'>
            <img src={logo} alt='21Xage' />
          </a>
        </div>
      </div>
      <hr />
      <CustomScroll heightRelativeToParent={'78%'}>
        <div className='sidebar-center'>
          <ul>
            <p className='title'>MAIN</p>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeSidebar}
            >
              <DashboardIcon className='sidebar-list-icon' />
              <span>Dashboard</span>
            </NavLink>
            <p className='title'>SUBSCRIBERS</p>
            <NavLink
              to='/subscribers/all'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeSidebar}
            >
              <PeopleAltOutlinedIcon className='sidebar-list-icon' />
              <span>All Subscribers</span>
            </NavLink>
            <NavLink
              to='/subscribers/latest'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeSidebar}
            >
              <RecentActorsIcon className='sidebar-list-icon' />
              <span>Latest</span>
            </NavLink>
            <NavLink
              to='/subscribers/active'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeSidebar}
            >
              <CheckIcon className='sidebar-list-icon' />
              <span>Active</span>
            </NavLink>
            <NavLink
              to='/subscribers/almost-expired'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeSidebar}
            >
              <AccessTimeIcon className='sidebar-list-icon' />
              <span>Almost Expired</span>
            </NavLink>
            <NavLink
              to='/subscribers/expired'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeSidebar}
            >
              <ClearIcon className='sidebar-list-icon' />
              <span>Expired</span>
            </NavLink>
            <NavLink
              to='/subscribers/add-new'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeSidebar}
            >
              <AddReactionIcon className='sidebar-list-icon' />
              <span>Add Subscriber</span>
            </NavLink>
            <NavLink
              to='/subscribers/search'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeSidebar}
            >
              <SearchOutlinedIcon className='sidebar-list-icon' />
              <span>Search</span>
            </NavLink>
            {admin.admin_level && admin.admin_level === 'Administrator' && (
              <>
                <p className='title'>RECORDERS</p>
                <NavLink
                  to='/recorders/all'
                  className={({ isActive }) =>
                    isActive ? 'active' : undefined
                  }
                  onClick={closeSidebar}
                >
                  <BadgeOutlinedIcon className='sidebar-list-icon' />
                  <span>Recorders</span>
                </NavLink>
                <NavLink
                  to='/recorders/add-new'
                  className={({ isActive }) =>
                    isActive ? 'active' : undefined
                  }
                  onClick={closeSidebar}
                >
                  <AddTaskIcon className='sidebar-list-icon' />
                  <span>Add Recorder</span>
                </NavLink>
              </>
            )}
            <p className='title'>USER</p>
            <NavLink
              to='/profile'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={closeSidebar}
            >
              <AccountCircleOutlinedIcon className='sidebar-list-icon' />
              <span>My Profile</span>
            </NavLink>
            <button onClick={() => authDispatch(logout())}>
              <LogoutOutlinedIcon className='sidebar-list-icon' />
              <span>Logout</span>
            </button>
            <br />
          </ul>
        </div>
      </CustomScroll>
      <hr />
    </div>
  );
}

export default MSidebar;
