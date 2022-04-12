import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './success.scss';

function Error({ successMsg }) {
  return (
    <div className='success-container'>
      <CheckCircleIcon style={{ marginRight: '5px' }} />
      <p className='success-msg'>{successMsg}</p>
    </div>
  );
}

export default Error;
