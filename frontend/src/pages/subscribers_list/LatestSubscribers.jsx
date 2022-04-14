import { Link } from 'react-router-dom';
import Datatable from '../../components/datatable/Datatable';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

import './subscriberslist.scss';

function LatestSubscribers() {
  return (
    <div className='subscribers-list-page-content'>
      <div className='top'>
        <div className='title-container all-subscribers'>
          <RecentActorsIcon className='title-icon' />
          <h2>Latest Subscribers</h2>
        </div>
        <Link className='btn' to='/subscribers/add-new'>
          Add New
        </Link>
      </div>

      <Datatable toDisplay='latest-subscribers' />
    </div>
  );
}

export default LatestSubscribers;
