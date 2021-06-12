import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppFile } from 'src/app/classes/file';
import { Flow } from 'src/app/classes/flow';
import { FlowService } from '../flow.service';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { Strings } from 'src/app/classes/strings';

@Component({
  selector: 'flow-page',
  templateUrl: './view-flow-page.component.html',
  styleUrls: ['./view-flow-page.component.scss'],
})
export class ViewFlowPageComponent implements OnInit {
  activeFile: AppFile | null = null;
  flow_id = 0;
  app_page = false;
  loading = true;
  Strings = Strings;

  flow$ = this.route.queryParams.pipe(
    switchMap((routeData) => {
      const flow_id = parseInt(routeData.flow_id);
      return this.flowService.getFlow(flow_id).pipe(map((flows) => flows[0]));
    })
  );

  constructor(
    private flowService: FlowService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.app_page = this.router.url.includes('/courriel/flow');
    this.flow$.subscribe((flow) => {
      if (!flow.read) {
        flow.markAsRead();
      }

      if (flow.files) {
        const defaultFlow = flow.files[0];
        console.log(defaultFlow);

        this.activeFile = defaultFlow;
      }
    });
  }

  ngOnInit(): void {}
}
