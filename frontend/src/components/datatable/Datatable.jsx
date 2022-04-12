import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import TelegramIcon from '@mui/icons-material/Telegram';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './datatable.scss';

/* TABLE COLUMNS SETTINGS -- START */
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'country', headerName: 'Country', width: 120 },
  { field: 'email', headerName: 'Email', width: 180 },
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
  { field: 'lastsubscription', headerName: 'Last Subscription', width: 150 },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    filterable: false,
    width: 160,
    renderCell: (params) => {
      return (
        <>
          <Link to={`/subscribers/${params.row.id}`}>
            <VisibilityIcon className='view-icon' />
          </Link>
          <Link to={`/subscribers/edit/${params.row.id}`}>
            <EditIcon className='edit-icon' />
          </Link>
          {params.row.telegram !== undefined && (
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
  const { toDisplay } = props;
  const [subscribers, setSubscribers] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    switch (toDisplay) {
      case 'all':
        setSubscribers(all);
        setHasFetched(true);
        break;

      case 'active':
        setSubscribers(active);
        setHasFetched(true);
        break;

      case 'about-to-expire':
        setSubscribers(aboutToExpire);
        setHasFetched(true);
        break;

      case 'expired':
        setSubscribers(expired);
        setHasFetched(true);
        break;

      default:
        setSubscribers([]);
        setHasFetched(true);
        break;
    }
  }, [toDisplay]);

  return (
    <div className='datatable'>
      {hasFetched && (
        <DataGrid
          rows={subscribers}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          className='datatable-grid'
        />
      )}
    </div>
  );
}

/* /////////////////////////////////////////////  DATA  //////////////////////////////////////////////// */
const all = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'USA',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'USA',
    joined: '2019-01-01',
    lastsubscription: '2022-03-9',
    telegram: 'charleeyy',
    status: 'Almost Expired',
  },
  {
    id: 3,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'Australia',
    joined: '2019-01-01',
    lastsubscription: '2022-02-25',
    telegram: 'charleeyy',
    status: 'Expired',
  },
  {
    id: 4,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'Nigeria',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
  {
    id: 5,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'Nigeria',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
  {
    id: 6,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'Nigeria',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
  {
    id: 7,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'Nigeria',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
  {
    id: 8,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'Nigeria',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
  {
    id: 9,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'Nigeria',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
  {
    id: 10,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'Nigeria',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
  {
    id: 11,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'Nigeria',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
  {
    id: 12,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'USA',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
];

const active = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'USA',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
  {
    id: 4,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'Nigeria',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
  {
    id: 5,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'Nigeria',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
  {
    id: 6,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'Nigeria',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
  {
    id: 7,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'Nigeria',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
  {
    id: 8,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'Nigeria',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
  {
    id: 9,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'Nigeria',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
  {
    id: 10,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'Nigeria',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
  {
    id: 11,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'Nigeria',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
  {
    id: 12,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'USA',
    joined: '2019-01-01',
    lastsubscription: '2022-03-25',
    telegram: 'charleeyy',
    status: 'Active',
  },
];

const aboutToExpire = [
  {
    id: 2,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'USA',
    joined: '2019-01-01',
    lastsubscription: '2022-03-9',
    telegram: 'charleeyy',
    status: 'Almost Expired',
  },
];

const expired = [
  {
    id: 3,
    name: 'John Doe',
    email: 'johndoe@email.com',
    country: 'Australia',
    joined: '2019-01-01',
    lastsubscription: '2022-02-25',
    telegram: 'charleeyy',
    status: 'Expired',
  },
];

export default Datatable;
