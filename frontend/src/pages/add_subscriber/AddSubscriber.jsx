import { useNavigate } from 'react-router-dom';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import './addsubscriber.scss';

function AddSubscriber() {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    /* This 'if else statement' checks if there is a previous page the user opened, to go back to. Or if user opened this page directly and in this case there is no previous page, then send user back to home page when they click on the back button */
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
    }
  };

  return (
    <div className='add-subscriber-container'>
      <div className='top'>
        <div className='title-container'>
          <AddReactionIcon className='title-icon' />
          <h2>Add New Subscriber</h2>
        </div>
        <div className='btn-container'>
          <button className='btn' onClick={handleBackButtonClick}>
            Back
          </button>
        </div>
      </div>
      <div className='bottom'>
        <form>
          <div className='form-input'>
            <label htmlFor='name'>Full Name</label>
            <input type='text' name='name' id='name' placeholder='Full Name' />
          </div>
          <div className='form-input'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' placeholder='Email' />
          </div>
          <div className='form-input'>
            <label htmlFor=''></label>
            <input type='text' name='' id='' placeholder='' />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSubscriber;
