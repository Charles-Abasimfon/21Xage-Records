import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import TelegramIcon from '@mui/icons-material/Telegram';
import Modal from '../../components/modal/Modal';
import './singlesubscriber.scss';

function SingleSubscriber() {
  const [subscriberInfo, setSubscriberInfo] = useState({});
  const [modalType, setModalType] = useState('');
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    setSubscriberInfo({
      name: 'John Doe',
      id: '123456789',
      telegram: 'charleeyy',
      status: 'Almost Expired',
      email: 'johndoe@email.com',
      phone: '+1 123 456 7890',
      address: '123 Main St, New York, NY 10001',
      country: 'USA',
      totalNoOfSubscriptions: '40',
      lastSubscription: '2020-01-01',
      noOfDaysBeforeExpire: '20',
      joined: '2018-01-01',
      additionalInfo:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam numquam laudantium, laboriosam rerum ipsa asperiores minima dolorem pariatur quisquam! Fugiat labore temporibus quo officiis sunt vel debitis modi vero rerum officia, consectetur harum eius, necessitatibus quidem! Quibusdam, architecto! Reiciendis, ducimus deserunt. Quo enim exercitationem, nostrum cumque odit id vel blanditiis.',
    });
  }, []);

  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    /* This 'if else statement' checks if there is a previous page the user opened, to go back to. Or if user opened this page directly and in this case there is no previous page, then send user back to home page when they click on the back button */
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
    }
  };

  const toggleModal = (type) => {
    setModalType(type);
    setDisplayModal(!displayModal);
  };

  return (
    <div className='single-subscriber'>
      <div className='top'>
        <div className='title-container'>
          <InfoIcon className='title-icon' />
          <h2>Subscriber Information</h2>
        </div>
        <div className='btn-container'>
          <a href={`https://telegram.me/`} target='_blank'>
            <TelegramIcon className='telegram-icon' />
          </a>
          <Link className='btn' to='/'>
            Edit Subscriber Data
          </Link>
          {subscriberInfo.status === 'Expired' && (
            <button
              className='btn'
              onClick={() => toggleModal('change-subscriber-status-to-active')}
            >
              Change Status to Active
            </button>
          )}
          {subscriberInfo.status === 'Almost Expired' && (
            <button
              className='btn'
              onClick={() => toggleModal('change-subscriber-status-to-active')}
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
          userId={subscriberInfo.id}
        />
      )}
      {subscriberInfo.status === 'Almost Expired' && (
        <Modal
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
          type={modalType}
          userId={subscriberInfo.id}
        />
      )}

      <div className='below-top'>
        <div className='left'>
          <div className='item'>
            <div className='details'>
              <h1 className='item-title'>{subscriberInfo.name}</h1>
              <div className='detail-item'>
                <span className='item-key'>Id:</span>
                <span className='item-value'>{subscriberInfo.id}</span>
              </div>
              <div className='detail-item'>
                <span className='item-key'>Telegram Username:</span>
                <span className='item-value'>{subscriberInfo.telegram}</span>
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
                  {subscriberInfo.lastSubscription}
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
            <span className='item-value'>{subscriberInfo.additionalInfo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleSubscriber;
