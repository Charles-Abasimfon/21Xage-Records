import { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import TelegramIcon from '@mui/icons-material/Telegram';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AuthContext } from '../../context/authContext/AuthContext';
import Loader from '../loader/Loader';
import './datatable.scss';
import {
  getAllSubscribers,
  getAllActiveSubscribers,
  getAllAlmostExpiredSubscribers,
  getAllExpiredSubscribers,
  getLatestSubscribers,
} from '../../apicalls/subscriberCalls';

/* TABLE COLUMNS SETTINGS -- START */
const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'country', headerName: 'Country', width: 120 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'telegram', headerName: 'Telegram', width: 130 },
  {
    field: 'status',
    headerName: 'Status',
    width: 160,
    renderCell: (params) => {
      return (
        <div
          className={`subscriber-status-container 
                ${params.row.status === 'Active' && 'active'} 
                ${params.row.status === 'Almost Expired' && 'pending'} 
                ${params.row.status === 'Expired' && 'expired'}`}
        >
          {params.row.status}
        </div>
      );
    },
  },
  {
    field: 'lastSubscriptionDate',
    headerName: 'Last Subscription',
    width: 150,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    filterable: false,
    width: 160,
    renderCell: (params) => {
      return (
        <>
          <Link to={`/subscribers/${params.row._id}`}>
            <VisibilityIcon className='view-icon' />
          </Link>
          <Link to={`/subscribers/edit/${params.row._id}`}>
            <EditIcon className='edit-icon' />
          </Link>
          {params.row.telegram && (
            <a
              href={`https://telegram.me/${params.row.telegram}`}
              target='_blank'
            >
              <TelegramIcon className='telegram-icon' />
            </a>
          )}
        </>
      );
    },
  },
];
/* TABLE COLUMNS SETTINGS -- END */

function Datatable(props) {
  const containerRef = useRef(null);
  const { toDisplay } = props;
  const [subscribers, setSubscribers] = useState(undefined);
  const { admin } = useContext(AuthContext);

  useEffect(() => {
    switch (toDisplay) {
      case 'all':
        getAllSubscribers(admin.token)
          .then((res) => {
            setSubscribers(res);
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case 'active':
        getAllActiveSubscribers(admin.token)
          .then((res) => {
            setSubscribers(res);
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case 'about-to-expire':
        getAllAlmostExpiredSubscribers(admin.token)
          .then((res) => {
            setSubscribers(res);
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case 'expired':
        getAllExpiredSubscribers(admin.token)
          .then((res) => {
            setSubscribers(res);
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case 'latest-subscribers':
        getLatestSubscribers(admin.token)
          .then((res) => {
            setSubscribers(res);
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      default:
        setSubscribers(undefined);
        break;
    }
  }, [toDisplay]);

  return (
    <div className='datatable' ref={containerRef}>
      {!subscribers ? (
        <Loader />
      ) : (
        <DataGrid
          container={containerRef.current}
          rows={subscribers}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          className='datatable-grid'
          getRowId={(subscriber) => subscriber.shorter_id}
        />
      )}
    </div>
  );
}

export default Datatable;
