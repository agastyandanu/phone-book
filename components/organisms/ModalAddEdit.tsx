import React, { useState, useEffect } from 'react';
import FlashModal from './FlashModal';
import Button from '../atoms/Button';

import {
  modalAddStyles,
  modalAddHeader,
  modalAddBody,
  contentAddStyles,
  formGroup,
  inputFormStyle,
} from './ModalAddEdit.style';
import { IoMdCloseCircle } from 'react-icons/io';

interface ModalAddEditProps {
  isOpen: boolean;
  onClose: () => void;
  initialContact?: {
    id: string,
    name: string;
    phone: string;
    email: string;
    profilePhoto: string;
  };
}

const ModalAddEdit: React.FC<ModalAddEditProps> = ({ isOpen, onClose, initialContact }) => {
  if (!isOpen) return null;

  const [isMissingForm, setIsMissingForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editedContact, setEditedContact] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    profilePhoto: '',
  });

  useEffect(() => {
    if (initialContact) {
      setEditedContact(initialContact);
    }
  }, [initialContact]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !editedContact.name ||
      !editedContact.phone ||
      !editedContact.email ||
      !editedContact.profilePhoto
    ) {
      setIsMissingForm(true);
      return;
    }

    console.log('submitted!', editedContact)
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();      
    }, 500);
  };

  return (
    <div className={modalAddStyles}>
      <div className={contentAddStyles}>
        <div className={modalAddHeader}>
          <h3>{initialContact ? 'Edit Contact' : 'Add Contact'}</h3>
          <IoMdCloseCircle className='close-btn' onClick={onClose} size={20} />
        </div>
        <div className={modalAddBody}>
          <form className={inputFormStyle}>
            <div className={formGroup}>
              <label>Name</label>
              <input
                type='text'
                name='name'
                value={editedContact.name}
                onChange={handleInputChange}
              />
            </div>
            <div className={formGroup}>
              <label>Email</label>
              <input
                type='email'
                name='email'
                value={editedContact.email}
                onChange={handleInputChange}
              />
            </div>
            <div className={formGroup}>
              <label>Phone</label>
              <input
                type='text'
                name='phone'
                value={editedContact.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className={formGroup}>
              <label>Profile Photo URL</label>
              <input
                type='text'
                name='profilePhoto'
                value={editedContact.profilePhoto}
                onChange={handleInputChange}
              />
            </div>
            <Button onClick={handleSubmit}>
              {initialContact ? 'Save Changes' : 'Add Contact'}
            </Button>
          </form>
        </div>
      </div>

      <FlashModal
        isOpen={isMissingForm}
        onClose={() => setIsMissingForm(false)}
        title='Please fill in all fields!'
      />


      <FlashModal
        isOpen={isSubmitted}
        onClose={() => setIsSubmitted(false)}
        title={initialContact ? 'Data updated successfully!' : 'Data saved successfully!'}
      />

    </div>
  );
};

export default ModalAddEdit;
