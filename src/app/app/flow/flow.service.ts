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
      $project_date: date = "1992-10-09T00:00:00Z"
      $action: Int = 10
      $owner_id: Int = 6
      $user_id: Int = 21 
      $numero: String = "3512"
      $content: String = "Observation"
      $project_owner_text: String = "CIFAG"
      $project_owner_id: Int = 6
      $files: file_arr_rel_insert_input = {
        data: [{ name: "File", size: 10 }, { name: "File", size: 10 }]
      }
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
          project_owner_text: $project_owner_text
          owner_id: $project_owner_id 
          flows: {
            data: {
              action: $action
              owner_id: $owner_id
              user_id: $user_id
              content: $content
              files: $files
              initiator_id: $project_owner_id
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
