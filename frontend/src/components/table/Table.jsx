import { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import TelegramIcon from '@mui/icons-material/Telegram';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './table.scss';

function List() {
  const [subscribers, setSubscribers] = useState([
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
  ]);

  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell className='table-cell'>ID</TableCell>
            <TableCell className='table-cell'>Name</TableCell>
            <TableCell className='table-cell'>Country</TableCell>
            <TableCell className='table-cell'>Email</TableCell>
            <TableCell className='table-cell'>Telegram</TableCell>
            <TableCell className='table-cell'>Status</TableCell>
            <TableCell className='table-cell'>Last Subscription</TableCell>
            <TableCell className='table-cell'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscribers.map((subscriber) => (
            <TableRow key={subscriber.id}>
              <TableCell className='table-cell'>{subscriber.id}</TableCell>
              <TableCell className='table-cell'>{subscriber.name}</TableCell>
              <TableCell className='table-cell'>{subscriber.country}</TableCell>
              <TableCell className='table-cell'>{subscriber.email}</TableCell>
              <TableCell className='table-cell'>
                {subscriber.telegram}
              </TableCell>
              <TableCell className='table-cell'>
                <div
                  className={`subscriber-status-container 
                ${subscriber.status === 'Active' && 'active'} 
                ${subscriber.status === 'Almost Expired' && 'pending'} 
                ${subscriber.status === 'Expired' && 'expired'}`}
                >
                  {subscriber.status}
                </div>
              </TableCell>
              <TableCell className='table-cell'>
                {subscriber.lastsubscription}
              </TableCell>
              <TableCell className='table-cell buttons'>
                <Link to={`/subscribers/${subscriber.id}`}>
                  <VisibilityIcon className='view-icon' />
                </Link>
                <Link to={`/subscribers/edit/${subscriber.id}`}>
                  <EditIcon className='edit-icon' />
                </Link>
                <a
                  href={`https://telegram.me/${subscriber.telegram}`}
                  target='_blank'
                >
                  <TelegramIcon className='telegram-icon' />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default List;
