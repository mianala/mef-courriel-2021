import { gql } from 'apollo-angular';
import { Entity } from '../classes/entity';
import { User } from '../classes/user';

export class AuthQueries {
  static USER_LOGIN_QUERY = gql`
    ${User.core_user_fields}
    ${Entity.CORE_ENTITY_FIELDS}
    query login($username: String!, $hashed: String!) {
      user(where: { username: { _eq: $username }, hashed: { _eq: $hashed } }) {
        ...CoreUserFields
        email
        rights
        phone
        settings_default_app
        settings_default_letter_text
        settings_default_flow_page
        entity {
          ...CoreEntityFields
        }
      }
    }
  `;
}
