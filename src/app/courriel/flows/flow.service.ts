import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Flow } from 'src/app/classes/flow';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/classes/user';
import { EntityService } from 'src/app/services/entity.service';
import FlowQueries from 'src/app/queries/flow.queries';
import { Location } from '@angular/common';

class FlowWithActions extends Flow {
  toggleImportant() {
    if (!this.important) {
      this.markAsImportant();
    } else {
      this.unmarkAsImportant();
    }
  }

  markAsImportant() {
    this.important = true;

    FlowService.getInstance().markAsImportant(this.id);
  }

  unmarkAsImportant() {
    this.important = false;

    FlowService.getInstance().unmarkAsImportant(this.id);
  }

  toggleRead() {
    if (!this.read) {
      this.markAsRead();
    } else {
      this.markAsUnread();
    }
  }

  markAsRead() {
    this.read = true;

    FlowService.getInstance().markFlowAsRead(this.id);
  }

  delete() {
    FlowService.getInstance().deleteFlow(this.id);
  }

  markAsUnread() {
    this.read = false;

    FlowService.getInstance().markFlowAsUnread(this.id);
  }

  static mapFlows = map((val: any): FlowWithActions[] => {
    return val.data.flow.map((val: any): FlowWithActions => {
      return new FlowWithActions(val);
    });
  });
}
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
    private location: Location,

    private notification: NotificationService
  ) {
    this.activeUser$.subscribe((user: User | null) => {
      this.inboxFlowsQuery = this.inboxFlows(user!.entity.id);
      this.sentFlowsQuery = this.sentFlows(user!.entity.id);

      this.inboxFlows$ = this.inboxFlowsQuery.valueChanges.pipe(
        FlowWithActions.mapFlows
      );
      this.sentFlows$ = this.sentFlowsQuery.valueChanges.pipe(
        FlowWithActions.mapFlows
      );
    });

    if (!FlowService.instance) {
      FlowService.instance = this;
    }
  }

  insertFlows(flows: any) {
    return this.apollo.mutate({
      mutation: FlowQueries.ADD,
      variables: { objects: flows },
    });
  }

  transferFlows(owner_id: number, new_owner_id: number) {}

  assign() {}

  getFlow(id: number) {
    return this.apollo
      .query({
        query: FlowQueries.FLOW,
        variables: {
          id: id,
        },
      })
      .pipe(FlowWithActions.mapFlows);
  }

  deleteFlow(flow_id: number) {
    if (!confirm('Voulez-vous vraiment supprimer ce courriel?')) {
      return;
    }

    return this.apollo
      .mutate({
        mutation: FlowQueries.DELETE,
        variables: {
          flow_id: flow_id,
        },
      })
      .subscribe((data) => {
        this.notification.notify('Courriel supprimé', 500);
        this.location.back();
      });
  }

  inboxFlows = (entity_id: number) => {
    return this.apollo.watchQuery({
      query: FlowQueries.INBOX,
      variables: { entity_id: entity_id },
      fetchPolicy: 'cache-and-network',
    });
  };

  sentFlows(entity_id: number) {
    return this.apollo.watchQuery({
      query: FlowQueries.SENT,
      variables: { entity_id },
      fetchPolicy: 'cache-and-network',
    });
  }

  markFlowAsRead(flow_id: number) {
    const set = { read: true };
    this.updateFlow(flow_id, set).subscribe(
      (data) => this.notification.notify('Marqué Comme Lu'),
      (error) => {
        console.log(error);
      }
    );
  }

  markFlowAsUnread(flow_id: number) {
    const set = { read: false };
    this.updateFlow(flow_id, set).subscribe(
      (data) => this.notification.notify('Marqué Comme Non Lu'),
      (error) => {
        console.log(error);
      }
    );
  }

  markAsImportant(flow_id: number) {
    const set = { important: true };
    this.updateFlow(flow_id, set).subscribe(
      (data) => this.notification.notify('Marqué Comme Important'),
      (error) => {
        console.log(error);
      }
    );
  }

  unmarkAsImportant(flow_id: number) {
    const set = { important: false };
    this.updateFlow(flow_id, set).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateFlow(flow_id: number, set: any = {}, inc: any = {}) {
    return this.apollo.mutate({
      mutation: FlowQueries.UPDATE,
      variables: {
        flow_id: flow_id,
        _set: set,
        _inc: inc,
      },
    });
  }

  searchApp(searchFilters: any) {
    this.searchQuery(searchFilters).subscribe((flows) => {
      this.searchAppResult$.next(flows);
    });
  }

  // search from received query
  searchQuery(searchFlowVariables: any) {
    searchFlowVariables.owner_id = {
      _eq: this.entityService._userEntity!.id,
    };

    return this.apollo
      .query({
        query: FlowQueries.SEARCH,
        variables: { where: searchFlowVariables },
      })
      .pipe(FlowWithActions.mapFlows);
  }

  static instance: FlowService;

  static getInstance() {
    if (FlowService.instance) {
      return FlowService.instance;
    }

    return FlowService.instance;
  }
}
