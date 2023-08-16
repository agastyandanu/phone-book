import React from 'react';
import Button from '@/components/atoms/Button';

import {
  modalDelStyles,
  contentDelStyles,
  modalDelHeader,
  submitButton
} from './ModalDelete.style';

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  id: number;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ isOpen, onClose, onDelete, id }) => {
  if (!isOpen) {
    return null;
  }

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div className={modalDelStyles}>
      <div className={contentDelStyles}>
        <div className={modalDelHeader}>
          <h3>Delete Contact</h3>
          <p>Are you sure you want to delete this contact?</p>
        </div>
        <div className={submitButton}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
