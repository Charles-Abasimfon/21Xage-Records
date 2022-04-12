import ErrorIcon from '@mui/icons-material/Error';
import './error.scss';

function Error({ errorMsg }) {
  return (
    <div className='error'>
      <div className='error-container'>
        <ErrorIcon style={{ marginRight: '5px' }} />
        <p className='error-msg'>{errorMsg}</p>
      </div>
    </div>
  );
}

export default Error;
