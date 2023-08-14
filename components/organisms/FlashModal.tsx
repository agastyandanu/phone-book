import React, { useEffect } from 'react';
import { modalStyles, modalBody, contentStyles } from './FlashModal.style';

interface FlashModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const FlashModal: React.FC<FlashModalProps> = ({ isOpen, onClose, title }) => {

  useEffect(() => {
    setTimeout(function() {
      onClose()
    }, 700);
  })

  if (!isOpen) {
    return null;
  }

  return (
    <div className={modalStyles}>
      <div className={contentStyles}>
        <div className={modalBody}>{title}</div>
      </div>
    </div>
  );
};

export default FlashModal;
