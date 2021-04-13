import { Entity } from './entity';
import { File } from './file';
import { Project } from './project';

export class Flow {
  id: number;
  action: number;
  owner_id: number;
  initiator_id: number;
  user_id: number;
  status: number;
  project_id: number;
  updated_at: Date;
  created_at: Date;
  receiver_text: string;
  content: string;
  labels: string;
  note: string;
  project: Project;
  owner: Entity;
  initiator: Entity;
  files: File[];
  constructor(_flow: Partial<{}> = {}) {
    this.id = 0;
    this.action = 0;
    this.owner_id = 0;
    this.initiator_id = 0;
    this.user_id = 0;
    this.status = 0;
    this.project_id = 0;
    this.receiver_text = '';
    this.content = '';
    this.updated_at = new Date();
    this.created_at = new Date();
    this.labels = '';
    this.note = '';
    this.project = new Project();
    this.owner = new Entity();
    this.initiator = new Entity();
    this.files = [];

    Object.assign(this, _flow)
  }


  hasFile() {
    return this.files.length;
  }

  isSaved() {
    return this.action == 1;
  }

  isUrgent() {
    return this.status == 1;
  }

  senderText() {
    return this.initiator !== null
      ? this.initiator.short
      : this.project.owner_text;
  }

  // for received flow
  numero() {}
  icon(){
    console.log(this.action == 1 ? 'description' : 'inbox')
    return this.action == 1 ? 'description' : 'inbox'
  }
}
