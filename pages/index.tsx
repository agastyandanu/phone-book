import { useState } from 'react'
import { useQuery, useApolloClient, useMutation } from '@apollo/client'
import { css } from '@emotion/css'
import Image from 'next/image'

import Layout from '@/templates/Layout'
import ContactList from '@/components/organisms/ContactList'
import ModalAdd from '@/components/organisms/ModalAdd'
import Header from '@/components/molecules/Header'
import Loading from '@/components/molecules/Loading'
import Button from '@/components/atoms/Button'

import contIllust from '@/public/images/contact-illust.svg'
import { IoMdAddCircle } from 'react-icons/io'

import { GET_CONTACT_LIST } from '@/graphql/queries'
import { ADD_CONTACT_WITH_PHONES } from '@/graphql/mutations'

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

const paginationButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

export default function PhoneBook() {
  const client = useApolloClient();
  const [addContact] = useMutation(ADD_CONTACT_WITH_PHONES);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { loading, error, data, refetch } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order_by: { created_at: 'desc' },
      where: {
        // filter
      },
    },
  });

  if (loading) {
    return <Loading isOpen={loading} />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const contacts = data?.contact || [];

  const handleModalClose = () => {
    setIsModalAddOpen(false);
    // await addContact({
    //   variables: contactData,
    // });

    refetch();

    // useQuery(GET_CONTACT_LIST, {
    //   variables: {
    //     firstName: '',
    //   },
    // })
  
    // await client.query({
    //   query: GET_CONTACT_LIST,
    //   variables: { firstName: '' },
    // });
  };

  const totalPages = Math.ceil((data?.contact_aggregate?.aggregate?.count || 0) / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  
  return (
    <>
      <Header title="Contact List | Phone Book App" description="Explore our comprehensive Phone Book List, featuring a curated collection of contact information. Easily find and access phone numbers, addresses, and more. Streamline your communication with our user-friendly Phone Book List." />
      <Layout>

        <Image className={mainIconSyle} src={contIllust.src} alt='contact-illustration' width={100} height={100} unoptimized />
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

          <div className={paginationButton}>
            <Button size='sm' onClick={() => handlePageChange(page - 1)}>
              Prev
            </Button>
            <span>Page {page} of {totalPages}</span>
            <Button size='sm' onClick={() => handlePageChange(page + 1)}>
              Next
            </Button>
          </div>
          
        </div>

        <ModalAdd isOpen={isModalAddOpen} onSuccess={() => handleModalClose()} onClose={() => setIsModalAddOpen(false)} />
      </Layout>
    </>
  )
}
