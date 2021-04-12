import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlowService } from '../../flow.service';

@Component({
  selector: 'flow-page',
  templateUrl: './flow-page.component.html',
  styleUrls: ['./flow-page.component.scss'],
})
export class FlowPageComponent implements OnInit {
  flow = new Flow();
  flow_id = 0
  constructor(private flowService: FlowService,
    private route: ActivatedRoute,
    ) {
    this.flow_id = parseInt(this.route.snapshot.params.flow_id);
    this.flowService.getFlow(this.flow_id).subscribe(this.receivedflow.bind(this));
  }

  receivedflow(data:any) {
    this.flow = data.data.flow
  }

  ngOnInit(): void {}
}
