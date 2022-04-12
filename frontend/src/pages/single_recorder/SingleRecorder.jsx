import { useNavigate, Link, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import Modal from '../../components/modal/Modal';
import { AuthContext } from '../../context/authContext/AuthContext';
import { getRecorderDataById } from '../../apicalls/recorderCalls';
import Loader from '../../components/loader/Loader';
import './singlerecorder.scss';

function SingleRecorder() {
  let { recorderId } = useParams();
  const { admin } = useContext(AuthContext);
  const [recorderInfo, setRecorderInfo] = useState(undefined);
  const [modalType, setModalType] = useState('');
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    getRecorderDataById(admin.token, recorderId)
      .then((res) => {
        setRecorderInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [recorderId]);

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
    <>
      {!recorderInfo ? (
        <Loader />
      ) : (
        <div className='single-recorder'>
          <div className='top'>
            <div className='title-container'>
              <InfoIcon className='title-icon' />
              <h2>Recorder Information</h2>
            </div>
            <div className='btn-container'>
              <Link className='btn' to={`/recorders/edit/${recorderId}`}>
                Edit Recorder Data
              </Link>
              {recorderInfo.status === 'Active' ? (
                <button
                  className='btn'
                  onClick={() => toggleModal('suspend-recorder')}
                >
                  Suspend Recorder
                </button>
              ) : (
                <button
                  className='btn'
                  onClick={() => toggleModal('reactivate-recorder')}
                >
                  Reactivate Recorder
                </button>
              )}

              <button
                className='btn'
                onClick={() => toggleModal('delete-recorder')}
              >
                Delete Recorder
              </button>
              <button className='btn' onClick={handleBackButtonClick}>
                Back
              </button>
            </div>
          </div>

          <Modal
            displayModal={displayModal}
            setDisplayModal={setDisplayModal}
            type={modalType}
            recorderId={recorderInfo._id}
            adminToken={admin.token}
            setRecorderInfo={setRecorderInfo}
          />

          <div className='below-top'>
            <div className='card'>
              <div className='item'>
                <div className='details'>
                  <h1 className='item-title'>{recorderInfo.name}</h1>
                  <div className='detail-item'>
                    <span className='item-key'>Level:</span>
                    <span className='item-value'>
                      {recorderInfo.admin_level}
                    </span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Id:</span>
                    <span className='item-value'>
                      {recorderInfo.shorter_id}
                    </span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Status:</span>
                    <span
                      className={`item-value recorder-status 
                ${recorderInfo.status === 'Active' && 'active'} 
                ${recorderInfo.status === 'Suspended' && 'suspended'}`}
                    >
                      <span>{recorderInfo.status}</span>
                    </span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Email:</span>
                    <span className='item-value'>{recorderInfo.email}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Phone Number:</span>
                    <span className='item-value'>{recorderInfo.phone}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Telegram Username:</span>
                    <span className='item-value'>{recorderInfo.telegram}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Address:</span>
                    <span className='item-value'>{recorderInfo.address}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Country:</span>
                    <span className='item-value'>{recorderInfo.country}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='item-key'>Added:</span>
                    <span className='item-value'>{recorderInfo.added}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleRecorder;
