import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppFile } from 'src/app/classes/file';
import { Flow } from 'src/app/classes/flow';
import { FlowService } from '../flow.service';
import { Location } from '@angular/common';

@Component({
  selector: 'flow-page',
  templateUrl: './view-flow-page.component.html',
  styleUrls: ['./view-flow-page.component.scss'],
})
export class ViewFlowPageComponent implements OnInit {
  flow = new Flow();
  flows: Flow[] = [];
  activeFile = new AppFile();
  flow_id = 0;
  app_page = false;
  loading = true;

  constructor(
    private flowService: FlowService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {
    this.app_page = this.router.url.includes('/courriel/flow');

    this.route.queryParams.subscribe((data) => {
      this.flow_id = parseInt(data.flow_id);

      this.flowService
        .getFlow(this.flow_id)
        .subscribe(this.receivedflow.bind(this));
    });
  }

  receivedflow(flows: any) {
    const flow = flows[0];
    this.activeFile = flow.files[0];
    Object.assign(this.flow, flow);
    Object.assign(this.flows, flow.flows);
    this.loading = false;
  }

  delete(id: number) {
    if (!confirm('Voulez-vous vraiment supprimer ce courriel?')) {
      return;
    }

    this.flowService.deleteFlow(id, (data) => {
      this.location.back();
    });
  }

  viewFile(file: AppFile) {
    this.activeFile = file;
    console.log(file);
  }

  ngOnInit(): void {}
}
