import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppFile } from 'src/app/classes/file';
import { Flow } from 'src/app/classes/flow';
import { Project } from 'src/app/classes/project';
import { FlowService } from '../../flow.service';

@Component({
  selector: 'flow-page',
  templateUrl: './flow-page.component.html',
  styleUrls: ['./flow-page.component.scss'],
})
export class FlowPageComponent implements OnInit {
  flow = new Flow();
  flows: Flow[] = [];
  project = new Project();
  activeFile = new AppFile()
  flow_id = 0;
  app_page = false

  constructor(private flowService: FlowService, private route: ActivatedRoute, private router: Router) {

    this.app_page = this.router.url.includes('/app/flow')

    this.route.queryParams.subscribe(data => {
      this.flow_id = parseInt(data.flow_id);

      this.flowService
        .getFlow(this.flow_id)
        .subscribe(this.receivedflow.bind(this));
    })
  }

  receivedflow(flows: any) {
    const flow = flows[0];
    this.activeFile = flow.files[0]
    Object.assign(this.flow, flow);
    Object.assign(this.flows, flow.flows);
  }

  delete(id: number) {

    if (!confirm("Voulez-vous vraiment supprimer ce courriel?")) {
      return
    }

    this.flowService.deleteFlow(id, (data) => {
      this.router.navigate([".."], {
        relativeTo: this.route
      })
      this.flowService.refreshFlows()
    })
  }

  viewFile(file: AppFile) {
    this.activeFile = file
    console.log(file);
  }


  ngOnInit(): void { }
}
