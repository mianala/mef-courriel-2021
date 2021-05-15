import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Entity } from 'src/app/classes/entity';
import { AppFile } from 'src/app/classes/file';
import { Flow } from 'src/app/classes/flow';
import { NotificationService } from 'src/app/services/notification.service';
import { EntityService } from '../entities/service/entity.service';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/classes/user';

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

  flowSearchResult$: BehaviorSubject<Flow[]> = new BehaviorSubject<Flow[]>([]);
  searchAppResult$: BehaviorSubject<Flow[]> = new BehaviorSubject<Flow[]>([]);

  searchFlows$: BehaviorSubject<Flow[]> = new BehaviorSubject<Flow[]>([]);
  activeEntity$ = this.entityService.activeEntity$;
  activeUser$ = this.userService.activeUser$;

  allFlows$ = this.activeUser$.pipe(
    filter((user) => !!user), // filter null
    switchMap((user: User | null) => {
      return this.getAllFlows(user!.entity.id);
    })
  );
  sentFlows$ = this.activeUser$.pipe(
    filter((user) => !!user), // filter null
    switchMap((user: User | null) => {
      return this.sentFlows(user!.entity.id);
    })
  );

  constructor(
    private apollo: Apollo,
    private entityService: EntityService,
    private userService: UserService,
    private notification: NotificationService
  ) {}

  insertFlows(flows: any) {
    const INSERT_FLOWS_QUERY = gql`
      mutation send_project($objects: [flow_insert_input!]!) {
        insert_flow(objects: $objects) {
          affected_rows
          returning {
            id
            content
            title
            numero
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
      ${Flow.ITEM_FLOW_FIELDS}

      query get_flow($id: Int!) {
        flow(where: { id: { _eq: $id } }) {
          ...ItemFlowFields
          children {
            ...CoreFlowFields
          }
          flows {
            ...CoreFlowFields
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
          this.notification.notify('Courriel supprimé', 500);
          next(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getAllFlows(entity_id: number) {
    const GET_ALL_FLOWS_QUERY = gql`
      ${Flow.ITEM_FLOW_FIELDS}
      query get_all_flows($entity_id: Int!) {
        flow(where: { owner_id: { _eq: $entity_id } }, order_by: { id: desc }) {
          ...ItemFlowFields
        }
      }
    `;

    return this.apollo
      .watchQuery({
        query: GET_ALL_FLOWS_QUERY,
        variables: { entity_id: entity_id },
        fetchPolicy: 'cache-and-network',
      })
      .valueChanges.pipe(this.flowMap);
  }

  sentFlows(entity_id: number) {
    const GET_SENT_FLOWS_QUERY = gql`
      ${Flow.ITEM_FLOW_FIELDS}

      query get_sent_flows($entity_id: Int!) {
        flow(
          where: { initiator_id: { _eq: $entity_id } }
          order_by: { id: desc }
        ) {
          ...ItemFlowFields
        }
      }
    `;

    return this.apollo
      .watchQuery({
        query: GET_SENT_FLOWS_QUERY,
        variables: { entity_id },
        fetchPolicy: 'cache-and-network',
      })
      .valueChanges.pipe(this.flowMap);
  }

  markFlowAsRead(flow_id: number) {
    const set = { progress: 1 };
    this.updateFlow(flow_id, set).subscribe(
      (data) => this.notification.notify('Marqué Comme Lu'),
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

  searchApp(searchFilters: any) {
    this.searchQuery(searchFilters).subscribe((flows) => {
      this.searchAppResult$.next(flows);
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
      _eq: this.entityService.activeEntity?.id,
    };

    return this.apollo
      .query({
        query: SEARCH_FLOWS_QUERY,
        variables: { where: searchFlowVariables },
      })
      .pipe(this.flowMap);
  }
}
