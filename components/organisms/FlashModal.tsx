import React, { useEffect } from 'react';
import { modalStyles, modalBody, contentStyles } from './FlashModal.style';

interface FlashModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const FlashModal: React.FC<FlashModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  useEffect(() => {
    setTimeout(function() {
      onClose()
    }, 700);
  })

  return (
    <div className={modalStyles}>
      <div className={contentStyles}>
        <div className={modalBody}>{title}</div>
      </div>
    </div>
  );
};

export default FlashModal;
