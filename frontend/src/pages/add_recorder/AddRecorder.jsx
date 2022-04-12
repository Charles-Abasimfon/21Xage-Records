import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTaskIcon from '@mui/icons-material/AddTask';
import './addrecorder.scss';

function AddRecorder() {
  const [formInputs, setFormInputs] = useState({
    name: '',
    telegram: '',
    email: '',
    phone: '',
    address: '',
    country: '',
  });

  const handleFormInputChange = (event) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };

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
    <div className='add-recorder-container'>
      <div className='top'>
        <div className='title-container'>
          <AddTaskIcon className='title-icon' />
          <h2>Add New Recorder</h2>
        </div>
        <div className='btn-container'>
          <button className='btn' onClick={handleBackButtonClick}>
            Back
          </button>
        </div>
      </div>
      <div className='bottom'>
        <form>
          <div className='form-group'>
            <label htmlFor='name'>Full Name</label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder=''
              value={formInputs.name}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder=''
              value={formInputs.email}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='telegram'>Telegram</label>
            <input
              type='text'
              name='telegram'
              id='telegram'
              placeholder='example: johnny'
              value={formInputs.telegram}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='phone'>Phone Number</label>
            <input
              type='tel'
              name='phone'
              id='phone'
              placeholder=''
              value={formInputs.phone}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-group address'>
            <label htmlFor='address'>
              Address <sup>(optional)</sup>
            </label>
            <input
              type='text'
              name='address'
              id='address'
              placeholder=''
              value={formInputs.address}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-group country'>
            <label htmlFor='country'>Country</label>
            <input
              type='text'
              name='country'
              id='country'
              placeholder=''
              value={formInputs.country}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-btn-container'>
            <button className='btn'>Add Recorder</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecorder;
