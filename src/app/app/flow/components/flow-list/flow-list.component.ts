import { Component, OnInit } from '@angular/core';
import { Flow } from 'src/app/classes/flow';
import { FlowService } from '../../flow.service';

@Component({
  selector: 'flow-list',
  templateUrl: './flow-list.component.html',
  styleUrls: ['./flow-list.component.scss'],
})
export class FlowListComponent implements OnInit {
  displayedColumns: string[] = ['sender', 'title', 'reference', 'id', 'date'];

  dataSource:Flow[] = [];

  constructor(private flowService: FlowService) {
    this.flowService.recent_flows.subscribe((data) => {
      console.log(data)
      this.dataSource = data;
    });
  }

  ngOnInit(): void {}
}
