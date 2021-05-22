import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(public flowService: FlowService, private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
