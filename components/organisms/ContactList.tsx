import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ContactListStyles, TableStyles, ActionButtonStyles } from './ContactList.style';

import ModalAddEdit from './ModalAddEdit';
import ModalDelete from './ModalDelete';
import FlashModal from './FlashModal';
import Button from '../atoms/Button';

import { FaRegStar, FaStar } from 'react-icons/fa';
import { MdModeEdit, MdDelete } from 'react-icons/md';

interface Contact {
  name: string;
  phone: string;
  email: string;
  profilePhoto: string;
  isFavourite: boolean;
}

interface ContactListProps {
  contacts: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  const router = useRouter();

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isAddFav, setIsAddFav] = useState(false);
  const [isRemoveFav, setIsRemoveFav] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [selectedData, setSelectedData] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    profilePhoto: '',
  })

  useEffect(() => {
    
  }, [])

  const detailAction = (data: any) => {
    router.push(`/phone-book/${data.id}`);
  }

  const favouriteAction = (data: any) => {
    console.log('status fav', data.id, data.isFavourite)
    const isFav = data.isFavourite;
    if (isFav) {
      setIsRemoveFav(true)
    } else {
      setIsAddFav(true)
    }
  }

  const editAction = (data: any) => {
    setSelectedData((prevData) => ({
      ...prevData,
      name: data.name,
      phone: data.phone,
      email: data.email,
      profilePhoto: data.profilePhoto
    }));
    setIsModalEditOpen(true)
  };

  const deleteAction = (data: any) => {
    setSelectedId(data.id);
    setIsModalDeleteOpen(true);
  };

  return (
    <div className={ContactListStyles}>
      
      <div>
        <table className={TableStyles}>
          <tbody>
            <tr><td><h3 className='favourite-contacts'>Favourite</h3></td><td></td><td></td><td></td></tr>
            {contacts.filter(contact => contact.isFavourite === true).map((val, key) => (
              <tr key={key}>
                <td className='profilePhoto' onClick={() => detailAction(val)}>
                  <img src={val.profilePhoto} alt='profile-photo' />
                </td>
                <td onClick={() => detailAction(val)}>{val.name}</td>
                <td onClick={() => detailAction(val)}>{val.phone}</td>
                <td onClick={() => detailAction(val)}>{val.email}</td>
                <td className={ActionButtonStyles}>
                  <Button
                    size='sm'
                    backgroundColor='#none'
                    backgroundColorHover='none'
                    color='#fe5c89'
                  >
                    {val.isFavourite ?
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
                    onClick={() => editAction(val)}
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
            <tr><td><h3 className='regular-contacts'>Regular</h3></td><td></td><td></td><td></td></tr>
            {contacts.filter(contact => contact.isFavourite === false).map((val, key) => (
              <tr key={key}>
                <td className='profilePhoto' onClick={() => detailAction(val)}>
                  <img src={val.profilePhoto} alt='profile-photo' />
                </td>
                <td onClick={() => detailAction(val)}>{val.name}</td>
                <td onClick={() => detailAction(val)}>{val.phone}</td>
                <td onClick={() => detailAction(val)}>{val.email}</td>
                <td className={ActionButtonStyles}>
                  <Button
                    size='sm'
                    backgroundColor='#none'
                    backgroundColorHover='none'
                    color='#fe5c89'
                  >
                    {val.isFavourite ?
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
                    onClick={() => editAction(val)}
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

      <ModalAddEdit isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} initialContact={selectedData} />
      <ModalDelete isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} id={selectedId} />
      <FlashModal isOpen={isAddFav} onClose={() => setIsAddFav(false)} title='Added to favourite!' />
      <FlashModal isOpen={isRemoveFav} onClose={() => setIsRemoveFav(false)} title='Removed from favourite!' />

    </div>
  );
};

export default ContactList;

