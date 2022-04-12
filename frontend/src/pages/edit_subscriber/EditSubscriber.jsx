import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import './editsubscriber.scss';

function EditSubscriber() {
  const [formInputs, setFormInputs] = useState({
    name: '',
    telegram: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    subscriptionDate: '',
    additionalInfo: '',
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
    <div className='edit-subscriber-container'>
      <div className='top'>
        <div className='title-container'>
          <EditIcon className='title-icon' />
          <h2>Edit Subscriber</h2>
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
          <div className='form-group date'>
            <label htmlFor='subscriptionDate'>Last Subscription Date:</label>
            <input
              type='date'
              id='subscriptionDate'
              name='subscriptionDate'
              min='2022-01-01'
              value={formInputs.subscriptionDate}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-group textarea'>
            <label htmlFor='additionalInfo'>
              Any Additional Info/Tag<sup>(optional)</sup>
            </label>
            <textarea
              name='additionalInfo'
              id='additionalInfo'
              placeholder='...'
              rows={5}
              value={formInputs.additionalInfo}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-btn-container'>
            <button className='btn'>Update Subscriber</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSubscriber;
