import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Flow } from 'src/app/classes/flow';
import { EntityService } from '../entities/service/entity.service';

@Injectable({
  providedIn: 'root',
})
export class FlowService {
  SAVE_PROJECT_FLOW_FILES = gql`
    mutation newSavedProject(
      $type_text: String!
      $title: String!
      $reference: String!
      $letter_text: String!
      $date_received: date!
      $project_date: date!
      $owner_id: Int!
      $user_id: Int!
      $numero: String!
      $labels: String!
      $content: String!
      $project_owner_text: String!
      $note: String
      $project_owner_id: Int
      $files: file_arr_rel_insert_input = {}
    ) {
      insert_project(
        objects: {
          date: $project_date
          date_received: $date_received
          reference: $reference
          title: $title
          type_text: $type_text
          letter_text: $letter_text
          numero: $numero
          owner_text: $project_owner_text
          owner_id: $project_owner_id
          flows: {
            data: {
              action: 1
              owner_id: $owner_id
              user_id: $user_id
              note: $note
              content: $content
              labels: $labels
              files: $files
              initiator_id: $owner_id
            }
          }
        }
      ) {
        returning {
          id
          numero
          title
          flows {
            id
            files {
              id
            }
          }
        }
      }
    }
  `;

  GET_FLOW_QUERY = gql`
    query get_flow($id: Int!) {
      flow(where: { id: { _eq: $id } }) {
        id
        content
        action
        initiator {
          id
          short
          short_header
        }
        owner {
          id
          short
          short_header
        }
        project {
          id
          title
          date
          reference
          owner_text
          owner {
            id
            short
            short_header
          }
          date_received
          flows {
            id
            initiator {
              id
              short
              short_header
            }
            owner {
              id
              short
              short_header
            }
            files {
              id
            }
          }
        }
      }
    }
  `;

  SUBSCRIBE_ALL_FLOWS = gql`
    subscription all_recent_flows($entity_id: Int!) {
      flow(where: { owner_id: { _eq: $entity_id } }) {
        id
        content
        action
        owner {
          short
        }

        project {
          title
          reference
          numero
        }

        initiator {
          short
        }
      }
    }
  `;

  GET_ALL_FLOWS = gql`
    query all_recent_flows($entity_id: Int!) {
      flow(where: { owner_id: { _eq: $entity_id } }) {
        id
        content
        action
        updated_at
        created_at
        owner {
          short
        }

        project {
          title
          reference
          numero
        }

        initiator {
          short
        }
      }
    }
  `;

  recent_flows: Subject<Flow[]> = new Subject();

  constructor(private apollo: Apollo, private entityService: EntityService) {
    this.getAllRecentFlow(this.entityService.active_entity.value.id);
  }

  saveProjectFlowFiles(variables: any) {
    return this.apollo.mutate({
      mutation: this.SAVE_PROJECT_FLOW_FILES,
      variables: variables,
    });
  }

  getFlow(id: number) {
    return this.apollo.query({
      query: this.GET_FLOW_QUERY,
      variables: {
        id: id,
      },
    });
  }

  getAllRecentFlow(entity_id: number) {
    return this.apollo
      .query({
        query: this.GET_ALL_FLOWS,
        variables: { entity_id },
      })
      .pipe(
        map((val: any) => {
          return val.data.flow.map((val: any) => {
            return new Flow(val);
          });
        })
      )
      .subscribe((flows: any) => {
        this.recent_flows.next(flows);
      });
  }
}
