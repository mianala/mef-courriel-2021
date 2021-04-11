import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class FlowService {
  save_project_flow_files = gql`
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

  constructor(private apollo: Apollo) {}

  saveProjectFlowFiles(variables: any) {
    console.log('Inserting', variables);

    return this.apollo.mutate({
      mutation: this.save_project_flow_files,
      variables: variables,
    });
  }
}
