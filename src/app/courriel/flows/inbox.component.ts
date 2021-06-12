import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, share, tap } from 'rxjs/operators';
import { Flow } from 'src/app/classes/flow';
import { Link } from 'src/app/classes/link';
import { Strings } from 'src/app/classes/strings';
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

  inboxFlows$ = this.flowService.inboxFlows$;

  unreadInboxFlows$ = this.inboxFlows$?.pipe(
    map((flows: Flow[]) => {
      // null hides the badge
      return flows.filter((flow) => !flow.read).length || null;
    })
  );

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
          this.flows$ = this.inboxFlows$;
          break;
        case Strings.inboxTypes.assigned.tabLabel:
          this.flows$ = this.assignedFlows$;
          break;

        default:
          break;
      }
    })
  );

  tabs = [
    {
      tab: Strings.inboxTypes.main.tabLabel,
      title: Strings.inboxTypes.main.title,
      icon: 'inbox',
      id: 0,
      order: 0,
      unread: this.unreadInboxFlows$,
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

  flows$ = this.inboxFlows$;

  constructor(public flowService: FlowService, private route: ActivatedRoute) {
    this.queryParams$.subscribe();
  }

  ngOnInit(): void {}
}
