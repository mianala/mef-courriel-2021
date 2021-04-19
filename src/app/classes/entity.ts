import gql from "graphql-tag";
import { EntityService } from "../app/entities/service/entity.service";
import { User } from "./user";

export class Entity {
  id: number;
  id_text: string;
  long: string;
  short: string;
  numero: number;
  sent_count: number;
  received_count: number;
  active: boolean;
  short_header: string;
  long_header: string;
  labels: string;
  sub_entities_count: number;
  level: number;
  parent_entity_id: number;
  users: User[]

  constructor(_entity: Partial<{}> = {}) {
    this.id = 0;
    this.id_text = '';
    this.long = '';
    this.short = '';
    this.numero = 0;
    this.sent_count = 0;
    this.received_count = 0;
    this.active = true;
    this.short_header = '';
    this.long_header = '';
    this.labels = '';
    this.sub_entities_count = 0;
    this.level = 0;
    this.parent_entity_id = 0;
    this.users = []

    Object.assign(this, _entity)
  }

  delete() {

  }

  static core_entity_fields = gql`
    fragment CoreEntityFields on entity{
      id
      id_text
      long
      short
      numero
      sent_count
      received_count
      active
      level
      parent_entity_id
      short_header
      long_header            
      labels
      sub_entities_count
      is_person
    }
  `
}
