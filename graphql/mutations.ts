import { gql } from '@apollo/client';

export const ADD_CONTACT_WITH_PHONES = gql`
  mutation AddContactWithPhones($firstName: String!, $lastName: String!, $phones: [phone_insert_input!]!) {
    insert_contact(objects: { first_name: $firstName, last_name: $lastName, phones: { data: $phones } }) {
      returning {
        id
        first_name
        last_name
        phones {
          number
        }
      }
    }
  }
`;

export const ADD_NUMBER_TO_CONTACT = gql`
  mutation AddNumberToContact($contactId: Int!, $phoneNumber: String!) {
    insert_phone(objects: { contact_id: $contactId, number: $phoneNumber }) {
      returning {
        contact {
          id
          first_name
          last_name
          phones {
            number
          }
        }
      }
    }
  }
`;

export const EDIT_CONTACT_BY_ID = gql`
  mutation EditContactById($id: Int!, $_set: contact_set_input) {
    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  } 
`;

export const EDIT_PHONE_NUMBER = gql`
  mutation EditPhoneNumber($pk_columns: phone_pk_columns_input!, $newPhoneNumber: String!) {
    update_phone_by_pk(pk_columns: $pk_columns, _set: { number: $newPhoneNumber }) {
      contact {
        id
        first_name
        last_name
        phones {
          number
        }
      }
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: Int!) {
    delete_contact_by_pk(id: $id) {
      id
      first_name
      last_name
    }
  }
`;
