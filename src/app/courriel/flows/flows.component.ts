import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Link } from 'src/app/classes/link';
import { EntityService } from 'src/app/services/entity.service';
import { FlowService } from './flow.service';
@Component({
  selector: 'app-flow',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.scss'],
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
