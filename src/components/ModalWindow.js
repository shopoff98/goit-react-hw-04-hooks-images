import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal, Overlay } from './styled/Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function ModalWindow({onClose, imageUrl}) {
  useEffect(() => {

    function handleKeyDown(e) {
    if (e.code === 'Escape') {
      onClose();
    }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  },[onClose])

  function handleBackdropClick (e)  {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

    return createPortal(
      <Overlay onClick={handleBackdropClick}>
        <Modal>
          <img src={imageUrl} alt="" />
        </Modal>
      </Overlay>,
      modalRoot,
    );
}
  
ModalWindow.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
