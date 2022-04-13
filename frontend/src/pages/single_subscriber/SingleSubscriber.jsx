import { useNavigate, Link, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import TelegramIcon from '@mui/icons-material/Telegram';
import Modal from '../../components/modal/Modal';
import { AuthContext } from '../../context/authContext/AuthContext';
import { getSubscriberDataById } from '../../apicalls/subscriberCalls';
import Loader from '../../components/loader/Loader';
import './singlesubscriber.scss';

function SingleSubscriber() {
  let { subscriberId } = useParams();
  const { admin } = useContext(AuthContext);
  const [subscriberInfo, setSubscriberInfo] = useState(undefined);
  const [modalType, setModalType] = useState('');
  const [displayModal, setDisplayModal] = useState(false);

  const getSubscriberInfo = () => {
    getSubscriberDataById(admin.token, subscriberId)
      .then((res) => {
        setSubscriberInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSubscriberInfo();
  }, [subscriberId]);

  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    /* This 'if else statement' checks if there is a previous page the user opened, to go back to. Or if user opened this page directly and in this case there is no previous page, then send user back to home page when they click on the back button */
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-2);
    } else {
      navigate('/', { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
    }
  };

  const toggleModal = (type) => {
    setModalType(type);
    setDisplayModal(!displayModal);
  };

  return (
    <>
      {!subscriberInfo ? (
        <Loader />
      ) : (
        <div className='single-subscriber'>
          <div className='top'>
            <div className='title-container'>
              <InfoIcon className='title-icon' />
              <h2>Subscriber Information</h2>
            </div>
            <div className='btn-container'>
              {subscriberInfo.telegram && (
                <a
                  href={`https://telegram.me/${subscriberInfo.telegram}`}
                  target='_blank'
                >
                  <TelegramIcon className='telegram-icon' />
                </a>
              )}
              <Link className='btn' to={`/subscribers/edit/${subscriberId}`}>
                Edit Subscriber Data
              </Link>
              {subscriberInfo.status === 'Expired' && (
                <button
                  className='btn'
                  onClick={() =>
                    toggleModal('change-subscriber-status-to-active')
                  }
                >
                  Change Status to Active
                </button>
              )}
              {subscriberInfo.status === 'Almost Expired' && (
                <button
                  className='btn'
                  onClick={() =>
                    toggleModal('change-subscriber-status-to-active')
                  }
                >
                  Change Status to Active
                </button>
              )}
              <button className='btn' onClick={handleBackButtonClick}>
                Back
              </button>
            </div>
          </div>

          {subscriberInfo.status === 'Expired' && (
            <Modal
              displayModal={displayModal}
              setDisplayModal={setDisplayModal}
              type={modalType}
              subscriberId={subscriberInfo._id}
              adminToken={admin.token}
              subscriberInfo={subscriberInfo}
              setSubscriberInfo={setSubscriberInfo}
              getSubscriberInfo={getSubscriberInfo}
            />
          )}
          {subscriberInfo.status === 'Almost Expired' && (
            <Modal
              displayModal={displayModal}
              setDisplayModal={setDisplayModal}
              type={modalType}
              subscriberId={subscriberInfo._id}
              adminToken={admin.token}
              subscriberInfo={subscriberInfo}
              getSubscriberInfo={getSubscriberInfo}
            />
          )}

          <div className='below-top'>
            <div className='left'>
              <div className='item'>
                <div className='details'>
                  <h1 className='item-title'>{subscriberInfo.name}</h1>
                  <div className='detail-item'>
                    <span className='item-key'>Id:</span>
                    <span className='item-value'>
                      {subscriberInfo.shorter_id}
                    </span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Telegram Username:</span>
                    <span className='item-value'>
                      {subscriberInfo.telegram}
                    </span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Status:</span>
                    <span
                      className={`item-value status 
                ${subscriberInfo.status === 'Active' && 'active'} 
                ${subscriberInfo.status === 'Almost Expired' && 'pending'} 
                ${subscriberInfo.status === 'Expired' && 'expired'}`}
                    >
                      <span>{subscriberInfo.status}</span>
                    </span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Email:</span>
                    <span className='item-value'>{subscriberInfo.email}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Phone Number:</span>
                    <span className='item-value'>{subscriberInfo.phone}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Address:</span>
                    <span className='item-value'>{subscriberInfo.address}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Country:</span>
                    <span className='item-value'>{subscriberInfo.country}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Total No of Subscriptions:</span>
                    <span className='item-value'>
                      {subscriberInfo.totalNoOfSubscriptions}
                    </span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Last Subscription:</span>
                    <span className='item-value'>
                      {subscriberInfo.lastSubscriptionDate}
                    </span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>
                      No of Days Before Subscription Expires:
                    </span>
                    <span className='item-value'>
                      {subscriberInfo.noOfDaysBeforeExpire}
                    </span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Joined:</span>
                    <span className='item-value'>{subscriberInfo.joined}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='right'>
              <div className='extra-info'>
                <span className='item-key'>Additional Info/Tags:</span>
                <span className='item-value'>
                  {subscriberInfo.additionalInfo}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleSubscriber;
