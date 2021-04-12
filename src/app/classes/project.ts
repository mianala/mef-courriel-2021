import { Entity } from './entity';
import { Flow } from './flow';

export class Project {
  id;
  numero;
  title;
  date
  date_received;
  owner_text;
  owner_id;
  type_text;
  letter_text;
  labels;
  closed;
  owner: Entity;
  flows: Flow[];
  constructor() {
    this.id = 0;
    this.numero = 0;
    this.closed = 0;
    this.title = 0;
    this.date = new Date()
    this.date_received =  new Date();
    this.owner_text = '';
    this.owner_id = 0;
    this.type_text = '';
    this.letter_text = '';
    this.labels = '';
    this.owner = new Entity();
    this.flows = [];
  }
}