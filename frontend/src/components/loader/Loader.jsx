import CircularProgress from '@mui/material/CircularProgress';
import './loader.scss';

function Loader() {
  return (
    <div className='loader-container'>
      <CircularProgress size={80} color='success' />
    </div>
  );
}

export default Loader;
