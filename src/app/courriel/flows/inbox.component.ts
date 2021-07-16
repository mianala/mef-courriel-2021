import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  share,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Flow } from 'src/app/classes/flow';
import { Link } from 'src/app/classes/link';
import { Strings } from 'src/app/classes/strings';
import { EntityService } from 'src/app/services/entity.service';
import { UserService } from 'src/app/services/user.service';
import { FlowService } from './flow.service';
@Component({
  selector: 'inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class FlowsComponent implements OnInit {
  today = new Date();

  // TODO: change later when most users won't have access to inbox
  activeTab = 'MAIN';
  Link = Link;

  // inboxFlows$ = this.flowService.inboxFlows$;

  // unreadInboxFlows$ = this.inboxFlows$?.pipe(
  //   map((flows: Flow[]) => {
  //     // null hides the badge
  //     return flows.filter((flow) => !flow.read).length || null;
  //   })
  // );

  // FIXME:
  pageLength = 1000;
  pageSize = 20;

  assignedFlows$ = this.flowService.assignedFlows$;
  unreadAssignedxFlows$ = this.assignedFlows$?.pipe(
    map((flows: Flow[]) => {
      // null hides the badge
      return flows.filter((flow) => !flow.read).length || null;
    })
  );

  appSearchFlows$ = this.flowService.flowSearchResult$;

  queryParams$ = this.route.queryParams.pipe(
    tap((params) => {
      this.activeTab = params.tab;
      switch (this.activeTab) {
        case Strings.inboxTypes.main.tabLabel:
          this.flows$ = this.inboxFlowsWithPagination$;
          break;
        case Strings.inboxTypes.assigned.tabLabel: {
          if (!this.assignedFlows$) return;
          this.flows$ = this.assignedFlows$;
          break;
        }
        case Strings.inboxTypes.sign.tabLabel:
          this.flows$ = this.signatureFlowsWithPagination$;
          break;
        case Strings.inboxTypes.lecture.tabLabel:
          this.flows$ = this.lectureFlowsWithPagination$;
          break;

        default:
          break;
      }
    })
  );

  inboxFlowsWithPagination$ = combineLatest([
    this.queryParams$,
    this.userService.activeUserEntityId$,
  ]).pipe(
    switchMap(([params, entity_id]) => {
      console.log(params, entity_id);

      const page = parseInt(params.page) || 0;
      const items = parseInt(params.items) || this.pageSize;
      const offset = page * items;

      return this.flowService.inboxFlowsWithPagination(
        entity_id,
        offset,
        items
      );
    })
  );

  signatureFlowsWithPagination$ = combineLatest([
    this.queryParams$,
    this.userService.activeUserEntityId$,
  ]).pipe(
    switchMap(([params, entity_id]) => {
      console.log(params, entity_id);

      const page = parseInt(params.page) || 0;
      const items = parseInt(params.items) || this.pageSize;
      const offset = page * items;

      return this.flowService.signatureFlowsWithPagination(
        entity_id,
        offset,
        items
      );
    })
  );

  lectureFlowsWithPagination$ = combineLatest([
    this.queryParams$,
    this.userService.activeUserEntityId$,
  ]).pipe(
    switchMap(([params, entity_id]) => {
      console.log(params, entity_id);

      const page = parseInt(params.page) || 0;
      const items = parseInt(params.items) || this.pageSize;
      const offset = page * items;

      return this.flowService.lectureFlowsWithPagination(
        entity_id,
        offset,
        items
      );
    })
  );

  tabs = [
    {
      tab: Strings.inboxTypes.main.tabLabel,
      title: Strings.inboxTypes.main.title,
      icon: 'inbox',
      id: 0,
      order: 0,
      // unread: this.unreadInboxFlows$,
    },
    {
      tab: Strings.inboxTypes.lecture.tabLabel,
      title: Strings.inboxTypes.lecture.title,
      icon: 'import_contacts',
      id: 0,
      order: 0,
    },
    {
      tab: Strings.inboxTypes.sign.tabLabel,
      title: Strings.inboxTypes.sign.title,
      icon: 'draw',
      id: 0,
      order: 0,
    },
    {
      tab: Strings.inboxTypes.assigned.tabLabel,
      title: Strings.inboxTypes.assigned.title,
      icon: 'work_outline',
      id: 0,
      order: 0,
      unread: this.unreadAssignedxFlows$,
    },
  ];

  flows$ = this.inboxFlowsWithPagination$;

  constructor(
    public flowService: FlowService,
    private entityService: EntityService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.queryParams$.subscribe();
    this.inboxFlowsWithPagination$.subscribe();
  }

  pageEvent(e: PageEvent) {
    console.log(e);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: e.pageIndex },
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {}
}
