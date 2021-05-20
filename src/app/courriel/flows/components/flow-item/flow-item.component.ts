import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Flow } from 'src/app/classes/flow';
import { Link } from 'src/app/classes/link';

@Component({
  selector: 'flow',
  templateUrl: './flow-item.component.html',
  styleUrls: ['./flow-item.component.scss'],
})
export class FlowItemComponent implements OnInit {
  Link = Link;
  @Input() flow: Flow = new Flow();
  @Input() layout = '';
  @HostBinding('class.read') get r() {
    return this.read();
  }
  @HostBinding('class.unread') get u() {
    return !this.read();
  }
  @HostBinding('class.sent') sent = false;

  constructor() {}

  ngOnInit(): void {
    this.sent = this.layout == 'sent';
  }

  markAsRead(flow_id: number) {}

  read() {
    return this.flow.read;
  }

  reply(flow_id: number) {}
}
