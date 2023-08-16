import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import FlashModal from '../FlashModal';
import Button from '../../atoms/Button';

import {
  modalEditStyles,
  modalEditHeader,
  modalEditBody,
  contentEditStyles,
  formGroup,
  inputFormStyle,
  submitButton
} from './ModalEdit.style'; // Anda perlu mengganti ini dengan path style yang sesuai
import { IoMdCloseCircle } from 'react-icons/io';

import { EDIT_CONTACT_BY_ID } from '@/graphql/mutations'; // Pastikan path ini benar

interface Phone {
  number: string;
}

interface ContactEdit {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  phones: Phone[];
}

interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialContact: ContactEdit | null;
}

const ModalEdit: React.FC<ModalEditProps> = ({ isOpen, onClose, onSuccess, initialContact }) => {
  const [isMissingForm, setIsMissingForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedPhones, setEditedPhones] = useState<string[]>([]);

  const [editContact] = useMutation(EDIT_CONTACT_BY_ID);

  useEffect(() => {
    if (initialContact) {
      setEditedFirstName(initialContact.first_name);
      setEditedLastName(initialContact.last_name);
      setEditedPhones(initialContact.phones.map(phone => phone.number));
    }
  }, [initialContact]);

  const handleSubmit = async () => {
    if (!editedFirstName || !editedLastName || editedPhones.some(phone => !phone)) {
      setIsMissingForm(true);
      return;
    }

    try {
      const { data } = await editContact({
        variables: {
          id: initialContact?.id,
          _set: {
            first_name: editedFirstName,
            last_name: editedLastName,
            phones: editedPhones.map(phone => ({ number: phone })),
          },
        },
      });

      if (data && data.update_contact_by_pk) {
        setIsSubmitted(true);
        onSuccess();
      }
    } catch (error) {
      console.error('Error editing contact:', error);
    }
  };

  const handlePhoneChange = (index: number, value: string) => {
    const updatedPhones = [...editedPhones];
    updatedPhones[index] = value;
    setEditedPhones(updatedPhones);
  };

  const addPhoneInput = () => {
    setEditedPhones(prevPhones => [...prevPhones, '']);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={modalEditStyles}>
      <div className={contentEditStyles}>
        <div className={modalEditHeader}>
          <h3>Edit Contact</h3>
          <IoMdCloseCircle className='close-btn' onClick={onClose} size={20} />
        </div>
        <div className={modalEditBody}>
          <form className={inputFormStyle}>
            <div className={formGroup}>
              <label>First Name</label>
              <input
                type='text'
                name='first_name'
                value={editedFirstName}
                onChange={(event) => setEditedFirstName(event.target.value)}
              />
            </div>
            <div className={formGroup}>
              <label>Last Name</label>
              <input
                type='text'
                name='last_name'
                value={editedLastName}
                onChange={(event) => setEditedLastName(event.target.value)}
              />
            </div>
            {editedPhones.map((phone, index) => (
              <div className={formGroup} key={index}>
                <label>Phone {index + 1}</label>
                <input
                  type='text'
                  name='phone'
                  value={phone}
                  onChange={(event) => handlePhoneChange(index, event.target.value)}
                />
              </div>
            ))}
            <div className={submitButton}>
              <Button onClick={addPhoneInput}>Add Phone</Button>
              <Button onClick={handleSubmit}>Save Changes</Button>
            </div>
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
        onClose={() => { setIsSubmitted(false); onSuccess(); }}
        title='Data updated successfully!'
      />
    </div>
  );
};

export default ModalEdit;
