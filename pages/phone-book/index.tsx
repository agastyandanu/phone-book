import { useEffect, useState } from 'react'
import { css } from '@emotion/css'

import Layout from '@/templates/Layout'
import ContactList from '@/components/organisms/ContactList'
import ModalAdd from '@/components/organisms/ModalAddEdit'
import Header from '@/components/molecules/Header'
import Loading from '@/components/molecules/Loading'
import Button from '@/components/atoms/Button'

import contIllust from '@/public/illustration/contact-illust.svg'
import { IoMdAddCircle } from 'react-icons/io'

const mainIconSyle = css`
  display: none;
  max-width: 280px;
  width: 28vw;
  height: 300px;
  object-fit: cover;
  margin-left: -60px;
  margin-right: 30px;
  border-radius: inherit;
  box-shadow: 0 60px 40px rgb(0 0 0 / 8%);
  background-color: #fe5c89;
  padding: 20px;

  @media (width <= 768px) {
    display: block;
    margin: -200px 0 30px 0;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    padding: 10px;
  }
`;

const ContainerStyle = css`
  width: 100%;

  h2 {
    text-align: center;
  }
`;

const TitleStyle = css`
  display: flex;
  justify-content: space-between;
  margin: 30px 0 20px 0;

  .add {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;

    @media (width <= 768px) {
      margin-top: 2px;

      span {
        display: none;
      }
    }
  }
`;

const FilterStyle = css`
  padding: 10px;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  color: #000000;
  font-size: 18px;
`;

export default function PhoneBook() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  
  const contacts = [
    { id: 1, name: 'Ladys Maopatni Sinaga', phone: '081234567890', email: 'ladys@gmail.com', profilePhoto: 'https://media.licdn.com/dms/image/C5603AQF6UWDJeQqRmA/profile-displayphoto-shrink_800_800/0/1643895737758?e=2147483647&v=beta&t=fbQhxo0Qlmm0_Au5CpFo5KLuU5Oxpfgt5iUBaBuUxjw', address: '421 Cindy Plains, Henriettehaven, North Carolina, 38957, 1-374-238-5482 x65968, 1-654-944-3614', isFavourite: true },
    { id: 2, name: 'Danu Agastyan', phone: '081234567890', email: 'agastyandanu@gmail.com', profilePhoto: 'https://media.licdn.com/dms/image/C5603AQF6UWDJeQqRmA/profile-displayphoto-shrink_800_800/0/1643895737758?e=2147483647&v=beta&t=fbQhxo0Qlmm0_Au5CpFo5KLuU5Oxpfgt5iUBaBuUxjw', address: '421 Cindy Plains, Henriettehaven, North Carolina, 38957, 1-374-238-5482 x65968, 1-654-944-3614', isFavourite: false },
    { id: 3, name: 'Jane Smith', phone: '081234567890', email: 'jane@example.com', profilePhoto: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/285ce8115100471.6047eaa30896a.jpg', address: '421 Cindy Plains, Henriettehaven, North Carolina, 38957, 1-374-238-5482 x65968, 1-654-944-3614', isFavourite: true },
    { id: 4, name: 'Jane Smith', phone: '081234567890', email: 'janesample@example.com', profilePhoto: 'https://media.licdn.com/dms/image/C5603AQF6UWDJeQqRmA/profile-displayphoto-shrink_800_800/0/1643895737758?e=2147483647&v=beta&t=fbQhxo0Qlmm0_Au5CpFo5KLuU5Oxpfgt5iUBaBuUxjw', address: '421 Cindy Plains, Henriettehaven, North Carolina, 38957, 1-374-238-5482 x65968, 1-654-944-3614', isFavourite: false },
    { id: 5, name: 'Jane Smith', phone: '081234567890', email: 'jane@example.com', profilePhoto: 'https://media.licdn.com/dms/image/C5603AQF6UWDJeQqRmA/profile-displayphoto-shrink_800_800/0/1643895737758?e=2147483647&v=beta&t=fbQhxo0Qlmm0_Au5CpFo5KLuU5Oxpfgt5iUBaBuUxjw', address: '421 Cindy Plains, Henriettehaven, North Carolina, 38957, 1-374-238-5482 x65968, 1-654-944-3614', isFavourite: true },
    { id: 6, name: 'Jane Smith', phone: '081234567890', email: 'jane@example.com', profilePhoto: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/285ce8115100471.6047eaa30896a.jpg', address: '421 Cindy Plains, Henriettehaven, North Carolina, 38957, 1-374-238-5482 x65968, 1-654-944-3614', isFavourite: false },
    { id: 7, name: 'Jane Smith Danu', phone: '081234567890', email: 'jane@example.com', profilePhoto: 'https://media.licdn.com/dms/image/C5603AQF6UWDJeQqRmA/profile-displayphoto-shrink_800_800/0/1643895737758?e=2147483647&v=beta&t=fbQhxo0Qlmm0_Au5CpFo5KLuU5Oxpfgt5iUBaBuUxjw', address: '421 Cindy Plains, Henriettehaven, North Carolina, 38957, 1-374-238-5482 x65968, 1-654-944-3614', isFavourite: false },
    { id: 8, name: 'Jane Smith', phone: '081234567890', email: 'jane@example.com', profilePhoto: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/285ce8115100471.6047eaa30896a.jpg', address: '421 Cindy Plains, Henriettehaven, North Carolina, 38957, 1-374-238-5482 x65968, 1-654-944-3614', isFavourite: false },
    { id: 9, name: 'Jane Smith', phone: '081234567890', email: 'jane@example.com', profilePhoto: 'https://media.licdn.com/dms/image/C5603AQF6UWDJeQqRmA/profile-displayphoto-shrink_800_800/0/1643895737758?e=2147483647&v=beta&t=fbQhxo0Qlmm0_Au5CpFo5KLuU5Oxpfgt5iUBaBuUxjw', address: '421 Cindy Plains, Henriettehaven, North Carolina, 38957, 1-374-238-5482 x65968, 1-654-944-3614', isFavourite: false },
    { id: 10, name: 'Jane Smith', phone: '081234567890', email: 'jane@example.com', profilePhoto: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/285ce8115100471.6047eaa30896a.jpg', address: '421 Cindy Plains, Henriettehaven, North Carolina, 38957, 1-374-238-5482 x65968, 1-654-944-3614', isFavourite: false },
    { id: 11, name: 'Jane Smith', phone: '081234567890', email: 'jane@example.com', profilePhoto: 'https://media.licdn.com/dms/image/C5603AQF6UWDJeQqRmA/profile-displayphoto-shrink_800_800/0/1643895737758?e=2147483647&v=beta&t=fbQhxo0Qlmm0_Au5CpFo5KLuU5Oxpfgt5iUBaBuUxjw', address: '421 Cindy Plains, Henriettehaven, North Carolina, 38957, 1-374-238-5482 x65968, 1-654-944-3614', isFavourite: false },
    { id: 12, name: 'Jane Smith Danu', phone: '081234567890', email: 'jane@example.com', profilePhoto: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/285ce8115100471.6047eaa30896a.jpg', address: '421 Cindy Plains, Henriettehaven, North Carolina, 38957, 1-374-238-5482 x65968, 1-654-944-3614', isFavourite: false },
    { id: 13, name: 'Jane Smith', phone: '081234567890', email: 'jane@example.com', profilePhoto: 'https://media.licdn.com/dms/image/C5603AQF6UWDJeQqRmA/profile-displayphoto-shrink_800_800/0/1643895737758?e=2147483647&v=beta&t=fbQhxo0Qlmm0_Au5CpFo5KLuU5Oxpfgt5iUBaBuUxjw', address: '421 Cindy Plains, Henriettehaven, North Carolina, 38957, 1-374-238-5482 x65968, 1-654-944-3614', isFavourite: false }
  ];

  useEffect(() => {
    setTimeout(function() {
      setIsLoading(false)
    }, 1000);
  })

  return (
    <>
      <Header title="Contact List | Phone Book App" description="Explore our comprehensive Phone Book List, featuring a curated collection of contact information. Easily find and access phone numbers, addresses, and more. Streamline your communication with our user-friendly Phone Book List." />
      <Loading isOpen={isLoading} />
      <Layout>

        <img className={mainIconSyle} src={contIllust.src} alt='contact-illustration' />
        <div className={ContainerStyle}>
          <h2>Your Contact List</h2>
          <div className={TitleStyle}>
            <h2>Contacts</h2>
            <Button size='sm' onClick={() => setIsModalAddOpen(true)}>
              <div className='add'>
                <IoMdAddCircle size={20} />
                <span>Add Contact</span>
              </div>
            </Button>
          </div>
          <input className={FilterStyle} placeholder='Search' />
          <ContactList contacts={contacts}></ContactList>
        </div>

        <ModalAdd isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)} />

      </Layout>
    </>
  )
}
