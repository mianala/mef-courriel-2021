import { Entity } from "./entity";

export class User {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  phone: number;
  im: number;
  title: string;
  rights: number;
  entity_id: number;
  profile_picture: string;
  active: boolean;
  settings_default_app: number;
  settings_default_flow_page: number;
  verified: boolean;
  entity: Entity

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
    this.settings_default_app = 0;
    this.settings_default_flow_page = 0;
    this.verified = true;
    this.entity = new Entity()


    Object.assign(this, _user)
  }

}
