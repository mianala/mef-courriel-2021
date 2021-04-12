import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

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
          owner{
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

  constructor(private apollo: Apollo) {}

  saveProjectFlowFiles(variables: any) {
    console.log('Inserting', variables);

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
}
