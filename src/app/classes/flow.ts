import { DatePipe } from '@angular/common';
import { gql } from 'apollo-angular';
import { Entity } from './entity';
import { AppFile } from './file';

export class Flow {
  id = 0;
  user_id = 0;

  // assigned
  assignee_id = 0;
  assigned = false;

  // flow status
  status = 0;
  important = false;
  read = false;
  action = 0;

  // flow information
  numero = 0;
  date = new Date();
  date_received = new Date();
  owner_text = '';
  type_text = '';
  letter_text = '';
  created_at = new Date();
  updated_at = new Date();
  labels = '';
  content = '';
  reference = '';
  initiator_text = '';
  note = '';
  title = '';

  // related entities
  owner_id = 0;
  owner = new Entity();
  initiator_id = 0;
  initiator = new Entity();

  // related flows
  root_id = 0;
  root: Flow | undefined;
  parent: Flow | undefined;
  children = [];
  flows = [];
  thread_id = 0;

  // files
  files: AppFile[] = [];

  constructor(_flow: Partial<{}> = {}) {
    Object.assign(this, _flow);
    this.files = this.files.map((file) => new AppFile(file));
  }

  hasFile() {
    return this.files.length;
  }

  is = {
    saved: () => {
      return this.action == 1;
    },
    sent: () => {
      return this.action == 2;
    },
    reply: () => {
      return this.action == 3;
    },
    urgent: () => {
      return this.status == 1;
    },
    read: () => {
      return this.status == 2;
    },
  };

  // implement in FlowWithActions
  markAsImportant() {}
  unmarkAsImportant() {}
  toggleImportant() {}

  toggleRead() {}
  markAsRead() {}
  markAsunread() {}

  sender() {
    return this.initiator_id ? this.initiator.short : this.initiator_text;
  }

  receiver() {
    return this.owner_id ? this.owner.short : this.owner_text;
  }

  variableFiles() {
    return { data: this.files };
  }

  icon() {
    console.log(this.action == 1 ? 'description' : 'inbox');
    return this.action == 1 ? 'description' : 'inbox';
  }

  shortTime() {
    return this.datepipe.transform(this.created_at, 'd MMM');
  }

  r = {
    title: () => {
      return this.is.saved() ? this.title : `${this.root?.title}`;
    },
    reference: () => {
      return this.is.saved() ? this.reference : this.root?.reference;
    },
    numero: () => {
      return this.is.saved() ? this.numero : this.root?.numero;
    },
    date: () => {
      return this.is.saved() ? this.date : this.root?.date;
    },
    date_received: () => {
      return this.is.saved() ? this.date_received : this.root?.date;
    },
    files: () => {
      return this.root?.files;
    },
  };

  rootId(): number {
    return this.is.saved() ? this.id : this.root_id;
  }

  static CORE_FLOW_FIELDS = gql`
    fragment CoreFlowFields on flow {
      id
      action

      # entities
      owner_id
      owner_text
      initiator_id
      initiator_text

      # flow info
      title
      reference
      numero
      status
      content
      labels
      letter_text
      type_text
      created_at
      updated_at
      date
      date_received

      # related flows
      thread_id
      parent_id

      # flow status
      progress
      important
      read

      # assignee
      assignee_id
      assigned
    }
  `;

  static ITEM_FLOW_FIELDS = gql`
    ${Entity.CORE_ENTITY_FIELDS}
    ${Flow.CORE_FLOW_FIELDS}
    ${AppFile.core_file_fields}

    fragment ItemFlowFields on flow {
      ...CoreFlowFields
      initiator {
        ...CoreEntityFields
      }
      parent {
        ...CoreFlowFields
        files {
          ...CoreFileFields
        }
      }
      root {
        ...CoreFlowFields
      }
      owner {
        ...CoreEntityFields
      }
      files {
        ...CoreFileFields
      }
    }
  `;

  datepipe = new DatePipe('fr-FR');
}
