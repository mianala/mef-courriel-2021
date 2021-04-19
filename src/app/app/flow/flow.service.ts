import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity } from 'src/app/classes/entity';
import { File } from 'src/app/classes/file';
import { Flow } from 'src/app/classes/flow';
import { Project } from 'src/app/classes/project';
import { NotificationService } from 'src/app/services/notification.service';
import { EntityService } from '../entities/service/entity.service';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class FlowService {




  SUBSCRIBE_ALL_FLOWS = gql`
    subscription all_recent_flows($entity_id: Int!) {
      flow(where: { owner_id: { _eq: $entity_id } }) {
        ...CoreFlowFields
      }
    }
  `;

  recent_flows: BehaviorSubject<Flow[]> = new BehaviorSubject<Flow[]>([]);

  constructor(private apollo: Apollo, private entityService: EntityService, private userService: UserService, private notification: NotificationService) {
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

  send(flows: any[]) {

    const SEND_PROJECT = gql`
      mutation send_project($objects: [flow_insert_input!]) {
        insert_flow(objects: $objects) {
          affected_rows
          returning{
            id
            content
          }
        }
      }
    `

    this.apollo.mutate({
      mutation: SEND_PROJECT,
      variables: flows
    }).subscribe(data => console.log(data));

  }

  assign() {

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

      ${Project.core_project_fields}
      ${Entity.core_entity_fields}
      ${Flow.core_flow_fields}
      query get_flow($id: Int!) {
        flow(where: { id: { _eq: $id } }) {
          ...CoreFlowFields
          initiator {
            ...CoreEntityFields
          }
          owner {
            ...CoreEntityFields
          }
          project {
            ...CoreProjectFields
            owner {
              ...CoreEntityFields
            }
            flows {
              id
              initiator {
                ...CoreEntityFields
              }
              owner {
                ...CoreEntityFields
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
    }).pipe(
      map((val: any) => {
        return val.data.flow.map((val: any) => {
          return new Flow(val);
        });
      }))
  }

  getAllFlow(entity_id: number) {
    const GET_ALL_FLOWS = gql`
      ${Project.core_project_fields}
      ${Entity.core_entity_fields}
      ${Flow.core_flow_fields}
      query all_recent_flows($entity_id: Int!) {
          flow(where: { owner_id: { _eq: $entity_id } }, order_by: {id: desc}) {
            ...CoreFlowFields
            initiator {
              ...CoreEntityFields
            }
            project {
              ...CoreProjectFields
            }
            owner {
              ...CoreEntityFields
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

  markFlowAsRead(flow_id: number) {
    const MARK_FLOW_AS_ANSWERED_MUTATION = gql`
      mutation mark_flow_as_answered($flow_id: Int!) {
        update_flow(where: {id: {_eq: $flow_id}}, _set: {progress: 1}) {
          affected_rows
          returning{
            id
          }
        }
      }
    `
    this.apollo.mutate({
      mutation: MARK_FLOW_AS_ANSWERED_MUTATION,
      variables: { flow_id: flow_id }
    }).subscribe(data => this.notification.open("Marqué Comme Lu"))
  }

  search(searchFlowVariables: any) {
    const SEARCH_FLOWS = gql`
      ${Project.core_project_fields}
      ${Entity.core_entity_fields}
      ${Flow.core_flow_fields}
      query searchFlows($where: flow_bool_exp = {}) {
        flow(where: $where, order_by: {id: desc}) {
          ...CoreFlowFields
          initiator {
            ...CoreEntityFields
          }
          project {
            ...CoreProjectFields
          }
          owner {
            ...CoreEntityFields
          }
        }
      }
      `

    return this.apollo.query({
      query: SEARCH_FLOWS,
      variables: { where: searchFlowVariables }
    }).pipe(
      map((val: any) => {
        return val.data.flow.map((val: any) => {
          return new Flow(val);
        });
      }))
  }

}
