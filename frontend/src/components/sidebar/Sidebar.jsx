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
            <li>
              <DashboardIcon className='sidebar-list-icon' />
              <span>Dashboard</span>
            </li>
            <p className='title'>SUBSCRIBERS</p>
            <li>
              <PeopleAltOutlinedIcon className='sidebar-list-icon' />
              <span>All Subscribers</span>
            </li>
            <li>
              <CheckIcon className='sidebar-list-icon' />
              <span>Active</span>
            </li>
            <li>
              <AccessTimeIcon className='sidebar-list-icon' />
              <span>About To Expire</span>
            </li>
            <li>
              <ClearIcon className='sidebar-list-icon' />
              <span>Expired</span>
            </li>
            <p className='title'>RECORDERS</p>
            <li>
              <BadgeOutlinedIcon className='sidebar-list-icon' />
              <span>Recorders</span>
            </li>
            <p className='title'>SYSTEM</p>
            <li>
              <NotificationsActiveOutlinedIcon className='sidebar-list-icon' />
              <span>Notifications</span>
            </li>
            <li>
              <SettingsSuggestOutlinedIcon className='sidebar-list-icon' />
              <span>System Health</span>
            </li>
            <li>
              <SummarizeOutlinedIcon className='sidebar-list-icon' />
              <span>Logs</span>
            </li>
            <li>
              <SettingsOutlinedIcon className='sidebar-list-icon' />
              <span>Settings</span>
            </li>
            <p className='title'>USER</p>
            <li>
              <AccountCircleOutlinedIcon className='sidebar-list-icon' />
              <span>Profile</span>
            </li>
            <li>
              <LogoutOutlinedIcon className='sidebar-list-icon' />
              <span>Logout</span>
            </li>
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
