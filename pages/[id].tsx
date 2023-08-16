import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { css } from '@emotion/css'
import Image from 'next/image'

import Layout from '@/templates/Layout'
import FlashModal from '@/components/organisms/FlashModal'
import ModalDelete from '@/components/organisms/ModalDelete'
import ModalEdit from '@/components/organisms/ModalEdit'
import Header from '@/components/molecules/Header'
import Button from '@/components/atoms/Button'

import profileImage from '@/public/images/profile-image.png'
import { HiPhone } from 'react-icons/hi'
import { MdEmail, MdLocationOn } from 'react-icons/md'
import { FaRegStar, FaStar, FaCalendarWeek } from 'react-icons/fa'
import { MdModeEdit, MdDelete } from 'react-icons/md'

import { GET_CONTACT_DETAIL } from '@/graphql/queries'
import { DELETE_CONTACT } from '@/graphql/mutations';
import { convertDateTime } from '@/utils/helpers'

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

interface Phone {
  number: string;
}

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
interface UserDetail {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  phones: Array<{
    phone: string;
  }>;
}
  
const DetailContact: React.FC<UserDetail> = () => {
  const router = useRouter();
  const [deleteContact] = useMutation(DELETE_CONTACT);

  const [isAddFav, setIsAddFav] = useState(false);
  const [isRemoveFav, setIsRemoveFav] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const [selectedEditContact, setSelectedEditContact] = useState<ContactEdit | null>(null);

  const { loading, error, data } = useQuery(GET_CONTACT_DETAIL, {
    variables: {
      id: router.query.id
    },
    skip: !router.query.id,
  });
  
  const userDetail = data?.contact_by_pk;

  const favouriteAction = (data: any) => {
    const isFav = data.isFavourite;
    if (isFav) {
      setIsRemoveFav(true)
    } else {
      setIsAddFav(true)
    }
  }

  const editAction = (contact: ContactEdit) => {
    setSelectedEditContact(contact)
    setIsModalEditOpen(true)
  };

  const deleteAction = (data: any) => {
    setSelectedId(data.id);
    setIsModalDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const { data } = await deleteContact({
        variables: { id: selectedId }
      });
      if (data && data.delete_contact_by_pk) {
        window.location.href = ('/');
      }
      setIsModalDeleteOpen(false);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <>
      <Header title="Detail Contact | Phone Book App" description="Explore our comprehensive Phone Book List, featuring a curated collection of contact information. Easily find and access phone numbers, addresses, and more. Streamline your communication with our user-friendly Phone Book List." />
      <Layout>
        <div className={ContainerStyle}>
          <Image className={ProfilePhoto} src={profileImage} alt='contact-illustration' width={100} height={100} unoptimized />
          <div className={ContentStyle}>
            <h2>{userDetail?.first_name} {userDetail?.last_name}</h2>
            <div className={ActionBtnStyle} style={{display: 'flex'}}>
              <Button
                size='sm'
                backgroundColor='#none'
                backgroundColorHover='none'
                color='#fe5c89'
              >
                {userDetail?.isFavourite ?
                  <FaStar
                    onClick={() => favouriteAction(userDetail)}
                    size={23}
                  />
                  :
                  <FaRegStar
                    onClick={() => favouriteAction(userDetail)}
                    size={23}
                  />
                }
              </Button>
              <Button
                size='sm'
                backgroundColor='#none'
                backgroundColorHover='none'
                color='#fe5c89'
                onClick={() => editAction(userDetail)}
              >
                <MdModeEdit size={25}/>
              </Button>
              <Button
                size='sm'
                backgroundColor='#none'
                backgroundColorHover='none'
                color='#fe5c89'
                onClick={() => deleteAction(userDetail)}
              >
                <MdDelete size={25}/>
              </Button>
            </div>
            <div className='detail'>
              <div className='dt'>
                <span><FaCalendarWeek className='icon' /></span>
                <span>{userDetail?.created_at && convertDateTime(userDetail.created_at)}</span>
              </div>
              <div className='dt'>
                <span><HiPhone className='icon' /></span>
                {userDetail?.phones?.map((val: Phone, key: number) => (
                  <span key={key}>{val.number}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {isModalEditOpen && selectedEditContact && (
        <ModalEdit
          isOpen={isModalEditOpen}
          onClose={() => setIsModalEditOpen(false)}
          onSuccess={() => {
            // setIsModalEditOpen(false);
          }}
          initialContact={selectedEditContact}
        />
      )}

        <ModalDelete isOpen={isModalDeleteOpen} onDelete={confirmDelete} onClose={() => setIsModalDeleteOpen(false)} id={selectedId} />
        <FlashModal isOpen={isAddFav} onClose={() => setIsAddFav(false)} title='Added to favourite!' />
        <FlashModal isOpen={isRemoveFav} onClose={() => setIsRemoveFav(false)} title='Removed from favourite!' />

      </Layout>
    </>
  )
}

export default DetailContact;
