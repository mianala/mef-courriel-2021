import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity } from 'src/app/classes/entity';
import { File } from 'src/app/classes/file';
import { Flow } from 'src/app/classes/flow';
import { EntityService } from '../entities/service/entity.service';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class FlowService {




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

  recent_flows: BehaviorSubject<Flow[]> = new BehaviorSubject<Flow[]>([]);

  constructor(private apollo: Apollo, private entityService: EntityService, private userService: UserService) {
    this.getAllFlow(this.entityService.active_entity.value.id);
  }

  saveProjectFlowFiles(variables: any) {
    const SAVE_PROJECT_FLOW_FILES = gql`
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
    return this.apollo.mutate({
      mutation: SAVE_PROJECT_FLOW_FILES,
      variables: variables,
    });
  }

  send(flows: Flow[]) {

    const SEND_PROJECT = gql`
      mutation send_project($objects: [flow_insert_input!]) {
        insert_flow(objects: $objects) {
          affected_rows
        }
      }
    `

    console.log(flows)

    return

    this.apollo.mutate({
      mutation: SEND_PROJECT,
      variables: flows
    })

  }

  reply(flow: Flow) {
    const REPLY_FLOW_MUTATION = gql`
      mutation send_project( $status: Int, $user_id: Int!, $owner_id: Int!, $initiator_id: Int!, $content: String = "", $action: Int!, $files: file_arr_rel_insert_input = {data: {}}, $project_id: Int!) {
        insert_flow(objects: {content: $content, user_id: $user_id, status: $status, owner_id: $owner_id, initiator_id: $initiator_id, action: $action, files: $files, project_id: $project_id}) {
          affected_rows
        }
      }
    `

    this.apollo.mutate({
      mutation: REPLY_FLOW_MUTATION,
      variables: flow
    })

    console.log(flow)

    return

    this.apollo.mutate({
      mutation: REPLY_FLOW_MUTATION,
      variables: flow
    })
  }
  getFlow(id: number) {
    const GET_FLOW_QUERY = gql`
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
    `
    return this.apollo.query({
      query: GET_FLOW_QUERY,
      variables: {
        id: id,
      },
    })
  }

  getAllFlow(entity_id: number) {
    const GET_ALL_FLOWS = gql`
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
    `
    this.apollo
      .query({
        query: GET_ALL_FLOWS,
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
      })
  }


}
