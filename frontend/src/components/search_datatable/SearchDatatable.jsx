import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import TelegramIcon from '@mui/icons-material/Telegram';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';
import Loader from '../loader/Loader';
import './searchdatatable.scss';

/* TABLE COLUMNS SETTINGS -- START */
const columns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 220,
    renderCell: (params) => {
      return (
        <div className='name'>
          <Link to={`/subscribers/${params.row._id}`}>{params.row.name}</Link>
        </div>
      );
    },
  },
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
  const { subscribers, setSubscribers } = props;

  return (
    <div className='search-datatable'>
      {!subscribers ? (
        <Loader />
      ) : (
        <DataGrid
          rows={subscribers}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          className='datatable-grid'
          getRowId={(subscriber) => subscriber.shorter_id}
          components={{
            NoRowsOverlay: () => (
              <div className='empty-overlay'>
                <BrowserNotSupportedIcon className='empty-overlay-icon' />
              </div>
            ),
          }}
        />
      )}
    </div>
  );
}

export default Datatable;
