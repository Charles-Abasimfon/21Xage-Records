import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AddTaskIcon from '@mui/icons-material/AddTask';
import logo from '../../assets/logo/21xage.webp';
import CustomScroll from 'react-custom-scroll';
import 'react-custom-scroll/dist/customScroll.css';
import './sidebar.scss';

function Sidebar() {
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
              to='/subscribers/active'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <CheckIcon className='sidebar-list-icon' />
              <span>Active</span>
            </NavLink>
            <NavLink
              to='/subscribers/about-to-expire'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <AccessTimeIcon className='sidebar-list-icon' />
              <span>About To Expire</span>
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
            <p className='title'>RECORDERS</p>
            <NavLink
              to='/recorders/all'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <BadgeOutlinedIcon className='sidebar-list-icon' />
              <span>Recorders</span>
            </NavLink>
            <NavLink
              to='/recorders/add-new'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <AddTaskIcon className='sidebar-list-icon' />
              <span>Add Recorder</span>
            </NavLink>
            <p className='title'>SYSTEM</p>
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
            </NavLink>
            <p className='title'>USER</p>
            <NavLink
              to='/my-profile'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <AccountCircleOutlinedIcon className='sidebar-list-icon' />
              <span>My Profile</span>
            </NavLink>
            <NavLink
              to='/logout'
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <LogoutOutlinedIcon className='sidebar-list-icon' />
              <span>Logout</span>
            </NavLink>
            <br />
          </ul>
        </div>
      </CustomScroll>
      <hr />
      <div className='sidebar-bottom'>
        <p className='color-mode-title'>COLOR MODE</p>
        <div className='color-mode'>
          <div className='color-option'>
            <LightModeOutlinedIcon />
          </div>
          <div className='color-option'>
            <DarkModeOutlinedIcon style={{ color: '#fff' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
