export interface IUser {
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
}
