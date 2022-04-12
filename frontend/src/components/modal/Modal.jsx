import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import InfoIcon from '@mui/icons-material/Info';
import {
  updateRecorderStatusToActiveOrInactiveById,
  deleteRecorderById,
} from '../../apicalls/recorderCalls';
import './modal.scss';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  bgcolor: '#fff',
  border: '2px solid #1e293b',
  boxShadow: 10,
  p: 4,
};

/* MODAL COMPONENT REQUIRES THE FOLLOWING PROPS: displayModal, setDisplayModal, type, userId -- Check other instances link the SingleRecorder Page for a good illustration of how to call Modal child component */

function ModalComponent(props) {
  const navigate = useNavigate();
  const modalContainerRef = useRef();
  const [modalContents, setModalContents] = useState({
    title: '',
    text: '',
    buttonText: '',
    buttonAction: () => {},
  });
  const {
    displayModal,
    setDisplayModal,
    type,
    recorderId,
    adminToken,
    setRecorderInfo,
  } = props;
  const handleClose = () => setDisplayModal(false);

  //Handle Suspend/Re-Activate recorder
  const handleSuspendOrReactivateRecorder = (type) => {
    updateRecorderStatusToActiveOrInactiveById(adminToken, recorderId, type)
      .then((res) => {
        /* Check if res is an error (isError === true) */
        if (res.isError === false) {
          setRecorderInfo({ ...res });
          handleClose();
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Handle Delete recorder
  const handleDeleteRecorder = () => {
    deleteRecorderById(adminToken, recorderId)
      .then((res) => {
        handleClose();
        navigate('/recorders/all', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    switch (type) {
      case 'suspend-recorder':
        setModalContents({
          title: 'Suspend Recorder',
          text: 'Are you sure you want to suspend this recorder?',
          buttonText: 'Suspend',
          buttonAction: () => handleSuspendOrReactivateRecorder('Suspended'),
        });
        break;

      case 'reactivate-recorder':
        setModalContents({
          title: 'Reactivate Recorder',
          text: 'Are you sure you want to reactivate this recorder?',
          buttonText: 'Reactivate',
          buttonAction: () => handleSuspendOrReactivateRecorder('Active'),
        });
        break;

      case 'delete-recorder':
        setModalContents({
          title: 'Delete Recorder',
          text: 'Are you sure you want to delete this recorder?',
          buttonText: 'Delete',
          buttonAction: () => handleDeleteRecorder(),
        });
        break;

      case 'change-subscriber-status-to-active':
        setModalContents({
          title: 'Change Status To Active',
          text: 'Are you sure you want to change this subscribers status to active?',
          buttonText: 'Change Status',
          buttonAction: () => {},
        });
        break;

      default:
        break;
    }
  }, [type]);

  return (
    <div className='modal' ref={modalContainerRef}>
      <Modal
        container={modalContainerRef.current}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
        open={displayModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={displayModal}>
          <Box sx={modalStyle}>
            <div
              className={`modal-title-container  ${
                type === 'suspend-recorder' && 'suspend'
              }
              ${type === 'delete-recorder' && 'delete'}
              ${
                type === 'change-subscriber-status-to-active' &&
                'change-status-to-active'
              }
                ${type === 'reactivate-recorder' && 'change-status-to-active'}`}
            >
              <InfoIcon className='title-icon' />
              <h2>{modalContents.title}</h2>
            </div>
            <div className='modal-content'>
              <p className='text'>{modalContents.text}</p>
            </div>
            <div className='btn-container'>
              <button className='btn' onClick={modalContents.buttonAction}>
                {modalContents.buttonText}
              </button>
              <button className='btn' onClick={handleClose}>
                Close
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalComponent;
