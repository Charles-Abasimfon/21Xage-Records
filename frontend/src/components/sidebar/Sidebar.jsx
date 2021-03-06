import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/dark_mode/darkModeContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AddTaskIcon from '@mui/icons-material/AddTask';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import logo from '../../assets/logo/21xage.webp';
import CustomScroll from 'react-custom-scroll';
import { AuthContext } from '../../context/authContext/AuthContext';
import { logout } from '../../context/authContext/AuthActions';
import 'react-custom-scroll/dist/customScroll.css';
import './sidebar.scss';

function Sidebar() {
  const { dispatch } = useContext(DarkModeContext);
  const { admin, dispatch: authDispatch } = useContext(AuthContext);

  return (
    <div className='sidebar'>
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
            >
              <DashboardIcon className='sidebar-list-icon' />
              <span>Dashboard</span>
            </NavLink>
            <p className='title'>SUBSCRIBERS</p>
            <NavLink
              to='/subscribers/all'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <PeopleAltOutlinedIcon className='sidebar-list-icon' />
              <span>All Subscribers</span>
            </NavLink>
            <NavLink
              to='/subscribers/latest'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <RecentActorsIcon className='sidebar-list-icon' />
              <span>Latest</span>
            </NavLink>
            <NavLink
              to='/subscribers/active'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <CheckIcon className='sidebar-list-icon' />
              <span>Active</span>
            </NavLink>
            <NavLink
              to='/subscribers/almost-expired'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <AccessTimeIcon className='sidebar-list-icon' />
              <span>Almost Expired</span>
            </NavLink>
            <NavLink
              to='/subscribers/expired'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <ClearIcon className='sidebar-list-icon' />
              <span>Expired</span>
            </NavLink>
            <NavLink
              to='/subscribers/add-new'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <AddReactionIcon className='sidebar-list-icon' />
              <span>Add Subscriber</span>
            </NavLink>
            <NavLink
              to='/subscribers/search'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
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
                >
                  <BadgeOutlinedIcon className='sidebar-list-icon' />
                  <span>Recorders</span>
                </NavLink>
                <NavLink
                  to='/recorders/add-new'
                  className={({ isActive }) =>
                    isActive ? 'active' : undefined
                  }
                >
                  <AddTaskIcon className='sidebar-list-icon' />
                  <span>Add Recorder</span>
                </NavLink>
              </>
            )}
            {/*             <p className='title'>SYSTEM</p>
            <NavLink
              to='/notifications'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <NotificationsActiveOutlinedIcon className='sidebar-list-icon' />
              <span>Notifications</span>
            </NavLink>
            <NavLink
              to='/system-health'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <SettingsSuggestOutlinedIcon className='sidebar-list-icon' />
              <span>System Health</span>
            </NavLink>
            <NavLink
              to='/logs'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <SummarizeOutlinedIcon className='sidebar-list-icon' />
              <span>Logs</span>
            </NavLink>
            <NavLink
              to='/settings'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <SettingsOutlinedIcon className='sidebar-list-icon' />
              <span>Settings</span>
            </NavLink> */}
            <p className='title'>USER</p>
            <NavLink
              to='/profile'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
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
      <div className='sidebar-bottom'>
        <p className='color-mode-title'>COLOR MODE</p>
        <div className='color-mode'>
          <div className='color-option'>
            <LightModeOutlinedIcon
              onClick={() => dispatch({ type: 'LIGHT_MODE' })}
            />
          </div>
          <div className='color-option'>
            <DarkModeOutlinedIcon
              style={{ color: '#fff' }}
              onClick={() => dispatch({ type: 'DARK_MODE' })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
