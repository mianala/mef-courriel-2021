import { gql } from 'apollo-angular';
import { Entity } from './entity';
import { Md5 } from 'ts-md5/dist/md5';
import { Link } from './link';

export class User {
  id = 0;
  lastname = '';
  firstname = '';
  email = '';
  phone = 0;
  im = 0;
  role = 40;
  title = '';
  rights = 0;
  entity_id = 0;
  profile_picture = '';
  active = true;
  settings_default_app = '';
  settings_default_letter_text = '';
  settings_default_flow_page = 0;
  verified = true;
  entity = new Entity();

  constructor(_user: Partial<{}> = {}) {
    Object.assign(this, _user);
  }

  static core_user_fields = gql`
    fragment CoreUserFields on user {
      id
      firstname
      lastname
      profile_picture
      entity_id
      im
      role
      last_login
      title
    }
  `;

  static user_item_fields = gql`
    ${User.core_user_fields}
    ${Entity.CORE_ENTITY_FIELDS}
    fragment UserItemFields on user {
      ...CoreUserFields
      verified
      active
      action_counter
      entity {
        ...CoreEntityFields
      }
    }
  `;

  // implemented in UserWithActions
  desactivate() {}
  activate() {}
  verify() {}
  delete() {}

  emailMD5() {
    return new Md5().appendStr(this.email).end();
  }

  static SETTINGS_DEFAULT_LETTER_TEXT = 'Lecture';

  hasInboxAccess() {
    return -this.role > -User.Role.MEMBER;
  }

  static Role = {
    LEAD: 1,
    INTERIM: 2,
    SECRETARY: 3,
    MEMBER: 4,
  };

  static Roles = [
    { value: 1, title: 'Lead' },
    { value: 2, title: 'Interim' },
    { value: 3, title: 'Secretary' },
    { value: 4, title: 'Member' },
  ];

  // omitted , default which is flow, to test user settings in user services
  static default_apps = [Link.SEARCH_APP, Link.CHAT_APP, Link.FLOWS_INBOX];
}
