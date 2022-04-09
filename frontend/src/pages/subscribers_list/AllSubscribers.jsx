import { Link } from 'react-router-dom';
import Datatable from '../../components/datatable/Datatable';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import './subscriberslist.scss';

function AllSubscribers() {
  return (
    <div className='subscribers-list-page-content'>
      <div className='top'>
        <div className='title-container all-subscribers'>
          <PeopleAltOutlinedIcon className='title-icon' />
          <h2>All Subscribers</h2>
        </div>
        <Link className='btn' to='/subscribers/add-new'>
          Add Subscriber
        </Link>
      </div>

      <Datatable toDisplay='all' />
    </div>
  );
}

export default AllSubscribers;
