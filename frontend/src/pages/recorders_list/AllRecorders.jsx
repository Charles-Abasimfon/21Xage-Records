import { Link } from 'react-router-dom';
import RecordersTable from '../../components/for_recorders/datatable/RecordersTable';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import './recorders.scss';
function AllRecorders() {
  return (
    <div className='recorders-list-page-content'>
      <div className='top'>
        <div className='title-container'>
          <BadgeOutlinedIcon className='title-icon' />
          <h2>All Recorders</h2>
        </div>
        <Link className='btn' to='/recorders/add-new'>
          Add New
        </Link>
      </div>

      <RecordersTable />
    </div>
  );
}

export default AllRecorders;
