import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { AuthContext } from '../../context/authContext/AuthContext';
import {
  getSubscriberDataById,
  updateSubscriberDataById,
} from '../../apicalls/subscriberCalls';
import Loader from '../../components/loader/Loader';
import CircularProgress from '@mui/material/CircularProgress';
import Error from '../../components/error/Error';
import './editsubscriber.scss';

function EditSubscriber() {
  let { subscriberId } = useParams();
  const { admin } = useContext(AuthContext);
  const [formInputs, setFormInputs] = useState(undefined);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorDetails, setErrorDetails] = useState({
    isError: false,
    errorMessage: '',
  });

  useEffect(() => {
    getSubscriberDataById(admin.token, subscriberId)
      .then((res) => {
        setFormInputs({
          name: res.name,
          telegram: res.telegram,
          email: res.email,
          phone: res.phone,
          address: res.address,
          country: res.country,
          lastSubscriptionDate: res.lastSubscriptionDate,
          additionalInfo: res.additionalInfo,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [subscriberId]);

  const handleUpdate = (event) => {
    event.preventDefault();
    setIsUpdating(true);
    setErrorDetails({
      isError: false,
      errorMessage: '',
    });
    updateSubscriberDataById(admin.token, subscriberId, formInputs)
      .then((res) => {
        /* Check if res is an error (isError === true) */
        if (res.isError === false) {
          setIsUpdating(false);
          setErrorDetails({
            isError: false,
            errorMessage: '',
          });
          navigate(`/subscribers/${subscriberId}`, { replace: true });
        } else {
          console.log(res.message);
          setIsUpdating(false);
          setErrorDetails({
            isError: true,
            errorMessage: res.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsUpdating(false);
        setErrorDetails({
          isError: true,
          errorMessage: 'Something went wrong. Please try again later.',
        });
      });
  };

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
    <>
      {!formInputs ? (
        <Loader />
      ) : (
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
            <form onSubmit={(event) => handleUpdate(event)}>
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
                <label htmlFor='lastSubscriptionDate'>
                  Last Subscription Date:{' '}
                  <sup style={{ marginLeft: '5px', color: '#dc2626' }}>
                    (required)
                  </sup>
                </label>
                <input
                  required={true}
                  type='date'
                  id='lastSubscriptionDate'
                  name='lastSubscriptionDate'
                  min='2022-01-01'
                  value={formInputs.lastSubscriptionDate}
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
              <div className='form-btn-container'>
                <button className='btn' disabled={isUpdating}>
                  {!isUpdating ? (
                    <>Update Subscriber</>
                  ) : (
                    <>
                      Loading{' '}
                      <CircularProgress
                        size={20}
                        style={{ marginLeft: '5px' }}
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditSubscriber;
