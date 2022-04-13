import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TelegramIcon from '@mui/icons-material/Telegram';
import { AuthContext } from '../../../context/authContext/AuthContext';
import { getAllRecorders } from '../../../apicalls/recorderCalls';
import Loader from '../../loader/Loader';
import './recorderstable.scss';

/* TABLE COLUMNS SETTINGS -- START */
const columns = [
  { field: 'name', headerName: 'Name', width: 220 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'phone', headerName: 'Phone', width: 160 },
  { field: 'telegram', headerName: 'Telegram', width: 120 },
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
    field: 'added',
    headerName: 'Added',
    width: 110,
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
          <Link to={`/recorders/${params.row._id}`}>
            <VisibilityIcon className='view-icon' />
          </Link>
          <Link to={`/recorders/edit/${params.row._id}`}>
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

function RecordersTable() {
  const { admin } = useContext(AuthContext);
  const [recorders, setRecorders] = useState(undefined);

  useEffect(() => {
    getAllRecorders(admin.token)
      .then((res) => {
        setRecorders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='datatable'>
      {!recorders ? (
        <Loader />
      ) : (
        <DataGrid
          rows={recorders}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          className='datatable-grid'
          getRowId={(recorder) => recorder.shorter_id}
        />
      )}
    </div>
  );
}

export default RecordersTable;
