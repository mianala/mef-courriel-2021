import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class FlowService {
  save_project_flow_files = gql`
    mutation newSavedProject(
      $type_text: String = "Video"
      $title: String = "Title"
      $reference: String = "12"
      $letter_text: String = "Lettre"
      $date_received: date = "1992-10-09T00:00:00Z"
      $date1: date = "1992-10-09T00:00:00Z"
      $action: Int = 10
      $owner_id: Int = 6
      $user_id: Int = 21 
      $numero: String = "3512"
      $content: String = "Observation"
      $owner_text: String = "CIFAG"
      $owner_id1: Int = 6
      $files: file_arr_rel_insert_input = {
        data: [{ name: "File", size: 10 }, { name: "File", size: 10 }]
      }
    ) {
      insert_project(
        objects: {
          date: $date1
          date_received: $date_received
          reference: $reference
          title: $title
          type_text: $type_text
          letter_text: $letter_text
          numero: $numero
          owner_text: $owner_text
          owner_id: $owner_id1
          flows: {
            data: {
              action: $action
              owner_id: $owner_id
              user_id: $user_id
              content: $content
              files: $files
              initiator_id: $owner_id1
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

  saveProjectFlowFiles(variables:any) {
    return this.apollo.mutate({
      mutation: this.save_project_flow_files,
      variables: variables,
    });
  }
}
