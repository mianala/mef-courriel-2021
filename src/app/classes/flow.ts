import { DatePipe } from '@angular/common'
import { gql } from 'apollo-angular';
import { Entity } from './entity';
import { AppFile } from './file';
import { Project } from './project';

export class Flow {
  id
  action
  owner_id
  initiator_id
  user_id
  status
  project_id
  updated_at
  created_at
  receiver_text
  content
  labels
  note
  reference
  initiator_text
  project
  thread_id
  owner
  initiator
  files: AppFile[]
  variable_files: { data: AppFile[] }
  datepipe

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
    this.reference = '';
    this.initiator_text = '';
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
    return this.project.owner_id ? this.project.owner.short : this.project.owner_text
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
      initiator_text
      progress
      owner_id
      created_at  
      updated_at
    }
  `
}
