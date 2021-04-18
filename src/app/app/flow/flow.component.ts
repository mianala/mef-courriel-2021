import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Flow } from 'src/app/classes/flow';
import { FlowService } from './flow.service';
@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {

  flows: Flow[] = [];
  labels: string[] = []
  loading = true

  searchToggle: boolean = false
  dateRangeToggle: boolean = false
  labelsToggle: boolean = false
  entityToggle: boolean = false

  flowGroup = 0
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  })

  constructor(private flowService: FlowService) {
    this.flowService.recent_flows.subscribe((data) => {
      this.flows = data;
    });
  }

  ngOnInit(): void {
  }

}
