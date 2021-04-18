import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entity } from 'src/app/classes/entity';
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
  flow_id = 0;

  constructor(private flowService: FlowService, private route: ActivatedRoute) {
    this.flow_id = parseInt(this.route.snapshot.params.flow_id);
    console.log(this.flow_id);
    this.flowService
      .getFlow(this.flow_id)
      .subscribe(this.receivedflow.bind(this));
  }

  receivedflow(flows: any) {
    const flow = flows[0];
    console.log(this.flow);
    Object.assign(this.flow, flow);
    Object.assign(this.project, flow.project);
    Object.assign(this.flows, flow.project.flows);
  }

  ngOnInit(): void { }
}
