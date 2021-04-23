import { gql } from 'apollo-angular';
import { Entity } from './entity';
import { Md5 } from 'ts-md5/dist/md5';

export class User {
  id;
  lastname;
  firstname;
  email;
  phone;
  im;
  title;
  rights;
  entity_id;
  profile_picture;
  active;
  settings_default_app;
  settings_default_flow_page;
  verified;
  entity;

  constructor(_user: Partial<{}> = {}) {
    this.id = 0;
    this.lastname = '';
    this.firstname = '';
    this.email = '';
    this.phone = 0;
    this.im = 0;
    this.title = '';
    this.rights = 0;
    this.entity_id = 0;
    this.profile_picture = '';
    this.active = true;
    this.settings_default_app = '';
    this.settings_default_flow_page = 0;
    this.verified = true;
    this.entity = new Entity();

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
      last_login
      title
    }
  `;

  emailMD5() {
    return new Md5().appendStr(this.email).end();
  }

  // omitted , default which is flow, to test user settings in user services
  static default_apps = ['/search', '/app/chat', '/app/flow'];
}
