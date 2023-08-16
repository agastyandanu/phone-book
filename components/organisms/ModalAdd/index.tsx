import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import FlashModal from '../FlashModal';
import Button from '../../atoms/Button';

import {
  modalAddStyles,
  modalAddHeader,
  modalAddBody,
  contentAddStyles,
  formGroup,
  inputFormStyle,
  submitButton
} from './ModalAdd.style';
import { IoMdCloseCircle } from 'react-icons/io';

import { ADD_CONTACT_WITH_PHONES } from '@/graphql/mutations';

interface ModalAddProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ModalAdd: React.FC<ModalAddProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isMissingForm, setIsMissingForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phones, setPhones] = useState<string[]>(['']);

  const [addContactWithPhones] = useMutation(ADD_CONTACT_WITH_PHONES);

  const handleSubmit = async () => {
    if (!firstName || !lastName || phones.some(phone => !phone)) {
      setIsMissingForm(true);
      return;
    }

    try {
      const { data } = await addContactWithPhones({
        variables: {
          firstName,
          lastName,
          phones: phones.map(phone => ({ number: phone })),
        },
      });

      if (data && data.insert_contact) {
        setIsSubmitted(true);
        window.location.href = ('/');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handlePhoneChange = (index: number, value: string) => {
    const updatedPhones = [...phones];
    updatedPhones[index] = value;
    setPhones(updatedPhones);
  };

  const addPhoneInput = () => {
    setPhones(prevPhones => [...prevPhones, '']);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={modalAddStyles}>
      <div className={contentAddStyles}>
        <div className={modalAddHeader}>
          <h3>Add Contact</h3>
          <IoMdCloseCircle className='close-btn' onClick={onClose} size={20} />
        </div>
        <div className={modalAddBody}>
          <form className={inputFormStyle}>
            <div className={formGroup}>
              <label>First Name</label>
              <input
                type='text'
                name='first_name'
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className={formGroup}>
              <label>Last Name</label>
              <input
                type='text'
                name='last_name'
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            {phones.map((phone, index) => (
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
              <Button onClick={handleSubmit}>Add Contact</Button>
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
        onClose={() => {setIsSubmitted(false), onSuccess}}
        title='Data saved successfully!'
      />
    </div>
  );
};

export default ModalAdd;

