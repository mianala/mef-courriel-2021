import { DatePipe } from '@angular/common'
import { gql } from 'apollo-angular';
import { Entity } from './entity';
import { AppFile } from './file';

export class Flow {
  date = new Date()
  date_received = new Date();
  datepipe = new DatePipe("fr-FR")
  id = 0;
  action = 0;
  root_id = 0;
  owner_id = 0;
  initiator_id = 0;
  numero = 0;
  user_id = 0;
  status = 0;
  receiver_text = '';
  type_text = '';
  letter_text = '';
  content = '';
  updated_at = new Date();
  created_at = new Date();
  labels = '';
  reference = '';
  initiator_text = '';
  note = '';
  title = '';
  thread_id = 0;
  owner = new Entity();
  initiator = new Entity();
  root: Flow | undefined;
  parent: Flow | undefined;
  files: AppFile[] = [];
  children = [];
  flows = [];

  constructor(_flow: Partial<{}> = {}) {
    Object.assign(this, _flow)
    this.files = this.files.map(file => new AppFile(file))
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
    return this.initiator_id ? this.initiator.short : this.initiator_text
  }

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

  r =
    {
      title: () => { this.isSaved() ? this.title : this.root?.title },
      reference: () => { this.isSaved() ? this.reference : this.root?.reference },
      numero: () => { this.isSaved() ? this.numero : this.root?.numero },
      date: () => { this.isSaved() ? this.date : this.root?.date },
      date_received: () => { this.isSaved() ? this.date_received : this.root?.date },
    }

  static core_flow_fields = gql`
    fragment CoreFlowFields on flow{
      id
      action
      content
      receiver_text
      reference
      status
      title
      thread_id
      parent_id
      initiator_text
      type_text
      letter_text
      progress
      numero
      owner_id
      created_at
      updated_at
      date
      date_received
    }
  `

}
