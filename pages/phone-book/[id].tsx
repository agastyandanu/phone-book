import { css } from '@emotion/css'

import Layout from '@/templates/Layout'
import FlashModal from '@/components/organisms/FlashModal'
import ModalAddEdit from '@/components/organisms/ModalAddEdit'
import ModalDelete from '@/components/organisms/ModalDelete'
import Header from '@/components/molecules/Header'
import Loading from '@/components/molecules/Loading'
import Button from '@/components/atoms/Button'

import { HiPhone } from 'react-icons/hi'
import { MdEmail, MdLocationOn } from 'react-icons/md'
import { useEffect, useState } from 'react'

import { FaRegStar, FaStar } from 'react-icons/fa';
import { MdModeEdit, MdDelete } from 'react-icons/md';

const ProfilePhoto = css`
  max-width: 280px;
  width: 250px;
  height: 250px;
  object-fit: cover;
  margin-left: -60px;
  margin-right: 40px;
  border-radius: 24px;

  @media (width <= 768px) {
    margin-top: -150px;
    margin-bottom: 30px;
    margin-inline: auto;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    padding: 10px;
  }
`;

const ContainerStyle = css`
  display: flex;
  width: 100%;
  padding: 50px 30px 50px 20px;
  background: #ffffff;
  border-radius: 24px;
  h2 {
    text-align: center;
  }

  @media (width <= 768px) {
    width: 100%;
    text-align: center;
    flex-direction: column;
  }
`;

const ContentStyle = css`
  width: 100%;

  .detail {
    margin-top: 25px;
    text-align: left;

    .dt {
      margin-top: 15px;
      display: flex;
      gap: 10px;
    }

    .icon {
      margin-top: 3px;
      font-size: 20px;
    }
  }
`

const ActionBtnStyle = css`
  margin-top: 10px;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;

export default function DetailContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAddFav, setIsAddFav] = useState(false);
  const [isRemoveFav, setIsRemoveFav] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [selectedData, setSelectedData] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    profilePhoto: '',
  })

  const userData = {
    id: 2,
    name: 'Danu Agastyan',
    phone: '081234567890',
    email: 'agastyandanu@gmail.com',
    profilePhoto: 'https://media.licdn.com/dms/image/C5603AQF6UWDJeQqRmA/profile-displayphoto-shrink_800_800/0/1643895737758?e=2147483647&v=beta&t=fbQhxo0Qlmm0_Au5CpFo5KLuU5Oxpfgt5iUBaBuUxjw',
    address: '421 Cindy Plains, Henriettehaven, North Carolina, 38957, 1-374-238-5482 x65968, 1-654-944-3614',
    isFavourite: false
  }

  useEffect(() => {
    setTimeout(function() {
      setIsLoading(false)
    }, 1000);
  })

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
      id: data.id,
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
    <>
      <Header title="Detail Contact | Phone Book App" description="Explore our comprehensive Phone Book List, featuring a curated collection of contact information. Easily find and access phone numbers, addresses, and more. Streamline your communication with our user-friendly Phone Book List." />
      <Loading isOpen={isLoading} />
      <Layout>
        <div className={ContainerStyle}>

          <img className={ProfilePhoto} src={userData?.profilePhoto} alt='contact-illustration' />

          <div className={ContentStyle}>
            <h2>{userData?.name || '-'}</h2>
            <div className={ActionBtnStyle} style={{display: 'flex'}}>
              <Button
                size='sm'
                backgroundColor='#none'
                backgroundColorHover='none'
                color='#fe5c89'
              >
                {userData.isFavourite ?
                  <FaStar
                    onClick={() => favouriteAction(userData)}
                    size={23}
                  />
                  :
                  <FaRegStar
                    onClick={() => favouriteAction(userData)}
                    size={23}
                  />
                }
              </Button>
              <Button
                size='sm'
                backgroundColor='#none'
                backgroundColorHover='none'
                color='#fe5c89'
                onClick={() => editAction(userData)}
              >
                <MdModeEdit size={25}/>
              </Button>
              <Button
                size='sm'
                backgroundColor='#none'
                backgroundColorHover='none'
                color='#fe5c89'
                onClick={() => deleteAction(userData)}
              >
                <MdDelete size={25}/>
              </Button>
            </div>
            <div className='detail'>
              <div className='dt'>
                <span><HiPhone className='icon' /></span>
                <span>{userData.phone || '-'}</span>
              </div>
              <div className='dt'>
                <span><MdEmail className='icon' /></span>
                <span>{userData?.email || '-'}</span>
              </div>
              <div className='dt'>
                <span><MdLocationOn className='icon' /></span>
                <span>{userData.address || '-'}</span>
              </div>
            </div>
          </div>

        </div>

        <ModalAddEdit isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} initialContact={selectedData} />
        <ModalDelete isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} id={selectedId} />
        <FlashModal isOpen={isAddFav} onClose={() => setIsAddFav(false)} title='Added to favourite!' />
        <FlashModal isOpen={isRemoveFav} onClose={() => setIsRemoveFav(false)} title='Removed from favourite!' />

      </Layout>
    </>
  )
}
