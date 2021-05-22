import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Link } from 'src/app/classes/link';
import { FlowService } from './flow.service';
@Component({
  selector: 'inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class FlowsComponent implements OnInit {
  today = new Date();
  Link = Link;

  inboxFlows$ = this.flowService.inboxFlows$;
  appSearchFlows$ = this.flowService.flowSearchResult$;
  queryParams$ = this.route.queryParams;
  activeTab$ = this.queryParams$.pipe(
    map((query) => (query.tab ? query.tab : 'MAIN'))
  );
  tabs = [
    {
      tab: 'MAIN',
      title: 'Principale',
      icon: 'inbox',
      id: 0,
      order: 0,
    },
    {
      tab: 'LECTURE',
      title: 'Lecture',
      icon: 'import_contacts',
      id: 0,
      order: 0,
    },
    {
      tab: 'SIGNATURE',
      title: 'Signature',
      icon: 'draw',
      id: 0,
      order: 0,
    },
    {
      tab: 'ASSIGNED',
      title: 'Assigné',
      icon: 'task_alt',
      id: 0,
      order: 0,
    },
  ];

  constructor(public flowService: FlowService, private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
