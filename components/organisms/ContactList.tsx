import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ContactListStyles, TableStyles, ActionButtonStyles } from './ContactList.style';
import { useMutation } from '@apollo/client';
import { DELETE_CONTACT } from '@/graphql/mutations';

import profileImage from '@/public/images/profile-image.png';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';
import FlashModal from './FlashModal';
import Button from '../atoms/Button';

import { FaRegStar, FaStar } from 'react-icons/fa';
import { MdModeEdit, MdDelete } from 'react-icons/md';

interface ContactEdit {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  phones: Array<{
    __typename: string;
    number: string;
  }>;
}

interface ContactListProps {
  contacts: ContactEdit[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  const router = useRouter();
  const [deleteContact] = useMutation(DELETE_CONTACT);

  console.log('CONTACTS DATA', contacts)

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isAddFav, setIsAddFav] = useState(false);
  const [isRemoveFav, setIsRemoveFav] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [closeFlashModal, setCloseFlashModal] = useState(false)

  const [selectedEditContact, setSelectedEditContact] = useState<ContactEdit | null>(null);


  const openEditModal = (contact: ContactEdit) => {
    setSelectedEditContact(contact);
    setIsModalEditOpen(true);
  };

  const detailAction = (data: any) => {
    router.push(`/${data.id}`);
  }

  function convertDateTime(dateTimeString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
  
    const dateTime = new Date(dateTimeString);
    return new Intl.DateTimeFormat('en-US', options).format(dateTime);
  }

  const favouriteAction = (data: any) => {
    const isFav = data.isFavourite;
    if (isFav) {
      setIsRemoveFav(true)
    } else {
      setIsAddFav(true)
    }
  }

  const deleteAction = (data: any) => {
    setSelectedId(data.id);
    setIsModalDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const { data } = await deleteContact({
        variables: { id: selectedId },
        refetchQueries: ['GetContactList'],
      });
      if (data && data.delete_contact_by_pk) {
        flashModal('Deleted Successfully!')
      }
      setIsModalDeleteOpen(false);
      setSelectedId(0);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const flashModal = (text: string) => {
    return (
      <FlashModal isOpen={isAddFav} onClose={() => setCloseFlashModal(false)} title='Added to favourite!' />
    )
  }

  return (
    <div className={ContactListStyles}>

      <div>
        <table className={TableStyles}>
          <tbody>
            <tr><td><h3 className='favourite-contacts'>Regular</h3></td><td></td><td></td><td></td></tr>
            {contacts.map((val, key) => (
              <tr key={key}>
                <td className='profilePhoto' onClick={() => detailAction(val)}>
                  <Image src={profileImage} alt='profile-photo' width={100} height={100} unoptimized />
                </td>
                <td onClick={() => detailAction(val)}>{val.first_name} {val.last_name}</td>
                <td onClick={() => detailAction(val)}>{convertDateTime(val.created_at)}</td>
                <td className={ActionButtonStyles}>
                  <Button
                    size='sm'
                    backgroundColor='#none'
                    backgroundColorHover='none'
                    color='#fe5c89'
                  >
                    {!val ?
                      <FaStar
                        className='is-fav'
                        onClick={() => favouriteAction(val)}
                      />
                      :
                      <FaRegStar
                        className='not-fav'
                        onClick={() => favouriteAction(val)}
                      />
                    }
                  </Button>
                  <Button
                    size='sm'
                    backgroundColor='#none'
                    backgroundColorHover='none'
                    color='#fe5c89'
                    onClick={() => openEditModal(val)}
                  >
                    <MdModeEdit size={22}/>
                  </Button>
                  <Button
                    size='sm'
                    backgroundColor='#none'
                    backgroundColorHover='none'
                    color='#fe5c89'
                    onClick={() => deleteAction(val)}
                  >
                    <MdDelete size={22}/>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalEditOpen && selectedEditContact && (
        <ModalEdit
          isOpen={isModalEditOpen}
          onClose={() => setIsModalEditOpen(false)}
          onSuccess={() => {
            console.log("UDAH SUKSES AJA")
            // setIsModalEditOpen(false);
          }}
          initialContact={selectedEditContact}
        />
      )}

      <ModalDelete
        id={selectedId}
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        onDelete={confirmDelete}
      />

      <FlashModal isOpen={isAddFav} onClose={() => setIsAddFav(false)} title='Added to favourite!' />
      <FlashModal isOpen={isRemoveFav} onClose={() => setIsRemoveFav(false)} title='Removed from favourite!' />

    </div>
  );
};

export default ContactList;

