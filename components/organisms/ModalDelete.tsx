import React, { useState } from 'react';
import FlashModal from './FlashModal';
import Button from '../atoms/Button';

import {
  modalDelStyles,
  modalDelHeader,
  contentDelStyles
} from './ModalDelete.style';

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ isOpen, onClose, id }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    console.log('deleted!', id);
    setIsDeleted(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={modalDelStyles}>
      <div className={contentDelStyles}>
        <h3>Are you sure to delete this contact?</h3>
        <div className={modalDelHeader}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleDelete}>Confirm</Button>
        </div>
      </div>

      <FlashModal
        isOpen={isDeleted}
        onClose={() => setIsDeleted(false)}
        title='Deleted successfully'
      />
    </div>
  );
};

export default ModalDelete;
