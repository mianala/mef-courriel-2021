import { gql } from 'apollo-angular';
import { Entity } from './entity';
import { Flow } from './flow';

export class Project {
  id;
  numero;
  title: string;
  date
  date_received;
  owner_text;
  owner_id;
  type_text;
  letter_text;
  reference;
  labels;
  closed;
  owner: Entity;
  flows: Flow[];
  constructor() {
    this.id = 0;
    this.numero = 0;
    this.closed = 0;
    this.title = "";
    this.date = new Date()
    this.date_received = new Date();
    this.owner_text = '';
    this.reference = '';
    this.owner_id = 0;
    this.type_text = '';
    this.letter_text = '';
    this.labels = '';
    this.owner = new Entity();
    this.flows = [];
  }

  hasOwner() {
    return this.owner_id !== null
  }

  static core_project_fields = gql`
    fragment CoreProjectFields on project{
      id
      title
      reference
      numero
      date
      date_received
    }
  `
}