import { Link } from 'react-router-dom';
import Datatable from '../../components/datatable/Datatable';
import CheckIcon from '@mui/icons-material/Check';
import './subscriberslist.scss';

function ActiveSubscribers() {
  return (
    <div className='subscribers-list-page-content'>
      <div className='top'>
        <div className='title-container active-subscribers'>
          <CheckIcon className='title-icon' />
          <h2>Active Subscribers</h2>
        </div>
        <Link className='btn' to='/subscribers/add-new'>
          Add New
        </Link>
      </div>

      <Datatable toDisplay='active' />
    </div>
  );
}

export default ActiveSubscribers;
