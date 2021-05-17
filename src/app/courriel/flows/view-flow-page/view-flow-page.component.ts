import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppFile } from 'src/app/classes/file';
import { Flow } from 'src/app/classes/flow';
import { FlowService } from '../flow.service';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';

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

  flow$ = this.route.queryParams.pipe(
    switchMap((routeData) => {
      const flow_id = parseInt(routeData.flow_id);
      return this.flowService.getFlow(flow_id).pipe(map((flows) => flows[0]));
    })
  );

  constructor(
    private flowService: FlowService,
    private route: ActivatedRoute,
    private location: Location,
    private notification: NotificationService,
    private router: Router
  ) {
    this.app_page = this.router.url.includes('/courriel/flow');
  }

  delete(id: number) {
    if (!confirm('Voulez-vous vraiment supprimer ce courriel?')) {
      return;
    }

    this.flowService.deleteFlow(id).subscribe(
      (data) => {
        console.log('delted flow ', id, data);

        this.notification.notify('Courriel supprimé', 500);
        this.location.back();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  viewFile(file: AppFile) {
    this.activeFile = file;
    console.log(file);
  }

  ngOnInit(): void {}
}
