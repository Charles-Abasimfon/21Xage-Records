import { Link } from 'react-router-dom';
import Datatable from '../../components/datatable/Datatable';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './subscriberslist.scss';

function AboutToExpireSubscribers() {
  return (
    <div className='subscribers-list-page-content'>
      <div className='top'>
        <div className='title-container abouttoexpire-subscribers'>
          <AccessTimeIcon className='title-icon' />
          <h2>Subscribers About To Expire</h2>
        </div>
      </div>

      <Datatable toDisplay='about-to-expire' />
    </div>
  );
}

export default AboutToExpireSubscribers;
