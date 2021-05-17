import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
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
  activeUser$ = this.userService.activeUser$.pipe(filter((user) => !!user));

  inboxFlows$: Observable<Flow[]> | undefined;
  inboxFlowsQuery:
    | QueryRef<
        unknown,
        {
          entity_id: number;
        }
      >
    | undefined;
  sentFlows$: Observable<Flow[]> | undefined;
  sentFlowsQuery:
    | QueryRef<
        unknown,
        {
          entity_id: number;
        }
      >
    | undefined;

  constructor(
    private apollo: Apollo,
    private entityService: EntityService,
    private userService: UserService,
    private notification: NotificationService
  ) {
    this.activeUser$.subscribe((user: User | null) => {
      this.inboxFlowsQuery = this.inboxFlows(user!.entity.id);
      this.sentFlowsQuery = this.sentFlows(user!.entity.id);

      this.inboxFlows$ = this.inboxFlowsQuery.valueChanges.pipe(this.flowMap);
      this.sentFlows$ = this.sentFlowsQuery.valueChanges.pipe(this.flowMap);
    });
  }

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

  deleteFlow(flow_id: number) {
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
    return this.apollo.mutate({
      mutation: DELETE_FLOW_MUTATION,
      variables: {
        flow_id: flow_id,
      },
    });
  }

  inboxFlows = (entity_id: number) => {
    const GET_INBOX_FLOWS_QUERY = gql`
      ${Flow.ITEM_FLOW_FIELDS}
      query get_inbox_flows($entity_id: Int!) {
        flow(where: { owner_id: { _eq: $entity_id } }, order_by: { id: desc }) {
          ...ItemFlowFields
        }
      }
    `;

    return this.apollo.watchQuery({
      query: GET_INBOX_FLOWS_QUERY,
      variables: { entity_id: entity_id },
      fetchPolicy: 'cache-and-network',
    });
  };

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

    return this.apollo.watchQuery({
      query: GET_SENT_FLOWS_QUERY,
      variables: { entity_id },
      fetchPolicy: 'cache-and-network',
    });
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
      _eq: this.entityService._userEntity!.id,
    };

    return this.apollo
      .query({
        query: SEARCH_FLOWS_QUERY,
        variables: { where: searchFlowVariables },
      })
      .pipe(this.flowMap);
  }
}
