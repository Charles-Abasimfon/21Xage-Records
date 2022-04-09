import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './recorderstable.scss';

/* TABLE COLUMNS SETTINGS -- START */
const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 160 },
  { field: 'telegram', headerName: 'Telegram', width: 100 },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => {
      return (
        <div
          className={`recorder-status-container 
                ${params.row.status === 'Active' && 'active'} 
                ${params.row.status === 'Suspended' && 'suspended'}`}
        >
          {params.row.status}
        </div>
      );
    },
  },
  {
    field: 'activity_count',
    headerName: 'Activity Count',
    desc: 'This is the number of times a recorder has added a new subscriber or updated one.',
    width: 140,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    filterable: false,
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <Link to={`/recorders/${params.row.id}`}>
            <VisibilityIcon className='view-icon' />
          </Link>
          <Link to={`/recorders/edit/${params.row.id}`}>
            <EditIcon className='edit-icon' />
          </Link>
        </>
      );
    },
  },
];
/* TABLE COLUMNS SETTINGS -- END */

function RecordersTable() {
  const [recorders, setRecorders] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    setRecorders(all);
    setHasFetched(true);
  }, []);

  return (
    <div className='datatable'>
      {hasFetched && (
        <DataGrid
          rows={recorders}
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
    phone: '+380991234567',
    telegram: 'charleeyy',
    activity_count: '10',
    status: 'Active',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '+380991234567',
    telegram: 'charleeyy',
    activity_count: '10',
    status: 'Suspended',
  },
  {
    id: 3,
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '+380991234567',
    telegram: 'charleeyy',
    activity_count: '10',
    status: 'Suspended',
  },
  {
    id: 4,
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '+380991234567',
    telegram: 'charleeyy',
    activity_count: '10',
    status: 'Active',
  },
  {
    id: 5,
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '+380991234567',
    telegram: 'charleeyy',
    activity_count: '10',
    status: 'Active',
  },
  {
    id: 6,
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '+380991234567',
    telegram: 'charleeyy',
    activity_count: '10',
    status: 'Active',
  },
];

export default RecordersTable;
