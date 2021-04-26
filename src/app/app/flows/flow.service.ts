import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity } from 'src/app/classes/entity';
import { AppFile } from 'src/app/classes/file';
import { Flow } from 'src/app/classes/flow';
import { NotificationService } from 'src/app/services/notification.service';
import { EntityService } from '../entities/service/entity.service';
import { UserService } from '../../services/user.service';

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

  allRecentFlows$: BehaviorSubject<Flow[]> = new BehaviorSubject<Flow[]>([]);
  flowSearchResult$: BehaviorSubject<Flow[]> = new BehaviorSubject<Flow[]>([]);
  searchAppResult$: BehaviorSubject<Flow[]> = new BehaviorSubject<Flow[]>([]);

  searchFlows$: BehaviorSubject<Flow[]> = new BehaviorSubject<Flow[]>([]);

  constructor(
    private apollo: Apollo,
    private entityService: EntityService,
    private notification: NotificationService
  ) {
    this.entityService.activeEntity$.subscribe((entity) => {
      // console.log('refreshing flows');

      if (entity.id) {
        this.refreshFlows();
      }
    });
  }

  refreshFlows() {
    this.entityService.activeEntity$.value.id &&
      this.getAllFlow(this.entityService.activeEntity$.value.id);
  }

  insertFlows(flows: any) {
    const INSERT_FLOWS_QUERY = gql`
      mutation send_project($objects: [flow_insert_input!]!) {
        insert_flow(objects: $objects) {
          affected_rows
          returning {
            id
            content
            files {
              id
            }
          }
        }
      }
    `;

    return this.apollo.mutate({
      mutation: INSERT_FLOWS_QUERY,
      variables: { objects: flows },
    });
  }

  assign() {}

  getFlow(id: number) {
    const GET_FLOW_QUERY = gql`
      ${Flow.CORE_FLOW_FIELDS}
      ${Entity.CORE_ENTITY_FIELDS}
      ${AppFile.core_file_fields}
      query get_flow($id: Int!) {
        flow(where: { id: { _eq: $id } }) {
          ...CoreFlowFields
          initiator {
            ...CoreEntityFields
          }
          parent {
            ...CoreFlowFields
          }
          root {
            ...CoreFlowFields
          }
          children {
            ...CoreFlowFields
          }
          flows {
            ...CoreFlowFields
          }
          owner {
            ...CoreEntityFields
          }
          files {
            ...CoreFileFields
          }
        }
      }
    `;
    return this.apollo
      .query({
        query: GET_FLOW_QUERY,
        variables: {
          id: id,
        },
      })
      .pipe(this.flowMap);
  }

  flowMap = map((val: any) => {
    return val.data.flow.map((val: any) => {
      return new Flow(val);
    });
  });

  deleteFlow(flow_id: number, next: (data: any) => void) {
    const DELETE_FLOW_MUTATION = gql`
      mutation delete_flow_mutation($flow_id: Int!) {
        delete_flow(where: { id: { _eq: $flow_id } }) {
          affected_rows
          returning {
            id
          }
        }
      }
    `;
    return this.apollo
      .mutate({
        mutation: DELETE_FLOW_MUTATION,
        variables: {
          flow_id: flow_id,
        },
      })
      .subscribe(
        (data) => {
          this.notification.open('Courriel supprimé', 500);
          next(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getAllFlow(entity_id: number) {
    const GET_ALL_FLOWS_QUERY = gql`
      ${Entity.CORE_ENTITY_FIELDS}
      ${Flow.CORE_FLOW_FIELDS}
      query get_all_recent_flows($entity_id: Int!) {
        flow(where: { owner_id: { _eq: $entity_id } }, order_by: { id: desc }) {
          ...CoreFlowFields
          initiator {
            ...CoreEntityFields
          }
          parent {
            ...CoreFlowFields
          }
          root {
            ...CoreFlowFields
          }
          owner {
            ...CoreEntityFields
          }
        }
      }
    `;

    this.apollo
      .watchQuery({
        query: GET_ALL_FLOWS_QUERY,
        variables: { entity_id },
        fetchPolicy: 'cache-and-network',
      })
      .valueChanges.pipe(this.flowMap)
      .subscribe(
        (flows: any) => {
          this.allRecentFlows$.next(flows);
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }

  markFlowAsRead(flow_id: number) {
    const set = { progress: 1 };
    this.updateFlow(flow_id, set).subscribe(
      (data) => this.notification.open('Marqué Comme Lu'),
      (error) => {
        console.log(error);
      }
    );
  }

  updateFlow(flow_id: number, set: any = {}, inc: any = {}) {
    const UPDATE_FLOW_MUTATION = gql`
      mutation update_flow_mutation(
        $flow_id: Int!
        $_set: flow_set_input = {}
        $_inc: flow_inc_input = {}
      ) {
        update_flow(
          where: { id: { _eq: $flow_id } }
          _set: $_set
          _inc: $_inc
        ) {
          affected_rows
          returning {
            id
          }
        }
      }
    `;

    return this.apollo.mutate({
      mutation: UPDATE_FLOW_MUTATION,
      variables: {
        flow_id: flow_id,
        set: set,
        inc: inc,
      },
    });
  }

  searchApp(searchFilters: any, next: () => void) {
    this.searchQuery(searchFilters).subscribe((flows) => {
      this.searchAppResult$.next(flows);
      next();
    });
  }

  searchQuery(searchFlowVariables: any) {
    const SEARCH_FLOWS_QUERY = gql`
      ${Entity.CORE_ENTITY_FIELDS}
      ${Flow.CORE_FLOW_FIELDS}
      query searchFlows($where: flow_bool_exp = {}) {
        flow(where: $where, order_by: { id: desc }) {
          ...CoreFlowFields
          initiator {
            ...CoreEntityFields
          }
          parent {
            ...CoreFlowFields
          }
          root {
            ...CoreFlowFields
          }
          owner {
            ...CoreEntityFields
          }
        }
      }
    `;

    searchFlowVariables.owner_id = {
      _eq: this.entityService.activeEntity$.value.id,
    };

    return this.apollo
      .query({
        query: SEARCH_FLOWS_QUERY,
        variables: { where: searchFlowVariables },
      })
      .pipe(this.flowMap);
  }
}
