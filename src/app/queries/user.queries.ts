import gql from 'graphql-tag';
import { Entity } from '../classes/entity';
import { User } from '../classes/user';

const UserQueries = {
  SAVE_NEW: gql`
    mutation new_user(
      $im: Int!
      $lastname: String!
      $phone: String!
      $title: String!
      $username: String!
      $hashed: String!
      $email: String!
      $firstname: String!
      $entity_id: Int!
    ) {
      insert_user(
        objects: {
          im: $im
          lastname: $lastname
          phone: $phone
          title: $title
          username: $username
          hashed: $hashed
          email: $email
          firstname: $firstname
          entity_id: $entity_id
        }
      ) {
        returning {
          id
        }
      }
    }
  `,

  UPDATE: gql`
    mutation update_user_mutation(
      $user_id: Int!
      $_set: user_set_input = {}
      $_inc: user_inc_input = {}
    ) {
      update_user(where: { id: { _eq: $user_id } }, _set: $_set, _inc: $_inc) {
        affected_rows
        returning {
          id
        }
      }
    }
  `,

  UNVERIFIED: gql`
    ${User.user_item_fields}
    query get_unverified_users {
      user(where: { verified: { _eq: false } }) {
        ...UserItemFields
      }
    }
  `,

  INACTIVE: gql`
    ${User.user_item_fields}
    query get_inactive_users {
      user(where: { active: { _eq: false } }) {
        ...UserItemFields
      }
    }
  `,

  ACTIVE_AND_VERIFIED: gql`
    ${User.user_item_fields}
    query get_active_and_inactive_users {
      user(
        where: { _and: { verified: { _eq: true }, active: { _eq: true } } }
      ) {
        ...UserItemFields
      }
    }
  `,

  USERS: gql`
    ${User.user_item_fields}
    query get_users {
      user {
        ...UserItemFields
      }
    }
  `,
  ENTITY_USERS: gql`
    ${User.user_item_fields}
    query get_users($entity_id: Int!) {
      user(where: { entity_id: { _eq: $entity_id } }) {
        ...UserItemFields
      }
    }
  `,
};

export default UserQueries;
