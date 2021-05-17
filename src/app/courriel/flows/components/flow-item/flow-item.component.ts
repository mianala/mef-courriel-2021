import { Component, Input, OnInit } from '@angular/core';
import { Flow } from 'src/app/classes/flow';
import { Link } from 'src/app/classes/link';
import { FlowService } from '../../flow.service';

@Component({
  selector: 'flow',
  templateUrl: './flow-item.component.html',
  styleUrls: ['./flow-item.component.scss'],
})
export class FlowItemComponent implements OnInit {
  Link = Link;
  @Input() flow: Flow = new Flow();
  @Input() layout = '';

  sent() {
    return this.layout == 'sent';
  }

  constructor(private flowService: FlowService) {}

  ngOnInit(): void {}

  markAsRead(flow_id: number) {}

  reply(flow_id: number) {}
}
