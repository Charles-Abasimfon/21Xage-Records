import { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import SearchDatatable from '../../components/search_datatable/SearchDatatable';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { searchSubscribers } from '../../apicalls/subscriberCalls';
import './searchsubscribers.scss';

function SearchSubscribers() {
  const { admin } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [subscribers, setSubscribers] = useState([]);

  let handleSearch = () => {
    setSubscribers('');
    searchSubscribers(admin.token, searchQuery)
      .then((res) => {
        setSubscribers(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='search-subscribers-list-page-content'>
      <div className='top'>
        <div className='search'>
          <input
            type='search'
            placeholder='Search by name, telegram, email, phone number ...'
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyPress={handleEnterKeyPress}
          />
          <SearchOutlinedIcon
            className='navbar-search-icon'
            onClick={handleSearch}
          />
        </div>
      </div>

      <SearchDatatable
        searchQuery={searchQuery}
        subscribers={subscribers}
        setSubscribers={setSubscribers}
      />
    </div>
  );
}

export default SearchSubscribers;
