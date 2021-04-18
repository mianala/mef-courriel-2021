import { Component, Input, OnInit } from '@angular/core';
import { Flow } from 'src/app/classes/flow';
import { FlowService } from '../../flow.service';

@Component({
  selector: 'flow',
  templateUrl: './flow-item.component.html',
  styleUrls: ['./flow-item.component.scss']
})
export class FlowItemComponent implements OnInit {
  @Input() flow: Flow = new Flow()
  constructor(private flowService: FlowService) { }

  ngOnInit(): void {
  }

  markAsRead(flow_id: number) {

  }

}
