import { DatePipe } from '@angular/common'
import { gql } from 'apollo-angular';
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
  thread_id: number;
  owner: Entity;
  initiator: Entity;
  files: File[];
  variable_files: { data: File[] };
  datepipe: DatePipe
  constructor(_flow: Partial<{}> = {}) {
    this.datepipe = new DatePipe("fr-FR")
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
    this.thread_id = 0;
    this.owner = new Entity();
    this.initiator = new Entity();
    this.files = [];
    this.variable_files = { data: [] };

    Object.assign(this, _flow)
  }


  hasFile() {
    return this.files.length;
  }

  isSaved() {
    return this.action == 1;
  }
  isSent() {
    return this.action == 2;
  }

  isUrgent() {
    return this.status == 1;
  }

  isRead() {
    return this.status == 2;
  }

  senderText() {
    return this.initiator !== null
      ? this.initiator.short
      : this.project.owner_text;
  }

  // for received flow
  numero() { }

  variableFiles() {
    return { data: this.files }
  }

  icon() {
    console.log(this.action == 1 ? 'description' : 'inbox')
    return this.action == 1 ? 'description' : 'inbox'
  }

  shortTime() {
    return this.datepipe.transform(this.created_at, 'd MMM');
  }


  static core_flow_fields = gql`
    fragment CoreFlowFields on flow{
      id
      action
      content
      project_id
      receiver_text
      reference
      status
      thread_id
      progress
      owner_id
      created_at  
      updated_at
    }
  `
}
