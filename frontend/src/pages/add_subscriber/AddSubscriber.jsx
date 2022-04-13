import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { addNewSubscriber } from '../../apicalls/subscriberCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Error from '../../components/error/Error';
import Success from '../../components/success/Success';
import './addsubscriber.scss';

function AddSubscriber() {
  const { admin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState({
    isError: false,
    errorMessage: '',
  });
  const [success, setSuccess] = useState(false);
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
    setSuccess(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorDetails({
      isError: false,
      errorMessage: '',
    });
    setSuccess(false);
    addNewSubscriber(admin.token, formInputs)
      .then((res) => {
        /* Check if res is an error (isError === false) */
        if (res.isError === false) {
          setIsLoading(false);
          setErrorDetails({
            isError: false,
            errorMessage: '',
          });
          setSuccess(true);
          //Refresh form
          setFormInputs({
            name: '',
            telegram: '',
            email: '',
            phone: '',
            address: '',
            country: '',
            subscriptionDate: '',
            additionalInfo: '',
          });
        } else {
          console.log(res.message);
          setIsLoading(false);
          setErrorDetails({
            isError: true,
            errorMessage: res.message,
          });
          setSuccess(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setErrorDetails({
          isError: true,
          errorMessage: 'Something went wrong. Please try again later.',
        });
      });
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
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='form-group'>
            <label htmlFor='name'>
              Full Name{' '}
              <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                (required)
              </sup>
            </label>
            <input
              required={true}
              type='text'
              name='name'
              id='name'
              placeholder=''
              value={formInputs.name}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>
              Email Address{' '}
              <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                (required)
              </sup>
            </label>
            <input
              required={true}
              type='email'
              name='email'
              id='email'
              placeholder=''
              value={formInputs.email}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='telegram'>
              Telegram{' '}
              <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                (required)
              </sup>
            </label>
            <input
              required={true}
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
            <label htmlFor='address'>Address</label>
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
            <label htmlFor='subscriptionDate'>
              Subscription Date:{' '}
              <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                (required)
              </sup>
            </label>
            <input
              required={true}
              type='date'
              id='subscriptionDate'
              name='subscriptionDate'
              min='2022-01-01'
              value={formInputs.subscriptionDate}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          <div className='form-group textarea'>
            <label htmlFor='additionalInfo'>Any Additional Info/Tag</label>
            <textarea
              name='additionalInfo'
              id='additionalInfo'
              placeholder='...'
              rows={5}
              value={formInputs.additionalInfo}
              onChange={(event) => handleFormInputChange(event)}
            />
          </div>
          {errorDetails.isError && (
            <Error errorMsg={errorDetails.errorMessage} />
          )}
          {success && <Success successMsg='Subscriber added successfully' />}
          <div className='form-btn-container'>
            <button className='btn'>
              {' '}
              {!isLoading ? (
                <>Add Subscriber</>
              ) : (
                <>
                  Loading{' '}
                  <CircularProgress size={20} style={{ marginLeft: '5px' }} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSubscriber;
