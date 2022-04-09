import { Link } from 'react-router-dom';
import Datatable from '../../components/datatable/Datatable';
import ClearIcon from '@mui/icons-material/Clear';
import './subscriberslist.scss';

function ExpiredSubscribers() {
  return (
    <div className='subscribers-list-page-content'>
      <div className='top'>
        <div className='title-container expired'>
          <ClearIcon className='title-icon' />
          <h2>Expired Subscribers</h2>
        </div>
      </div>

      <Datatable toDisplay='expired' />
    </div>
  );
}

export default ExpiredSubscribers;
