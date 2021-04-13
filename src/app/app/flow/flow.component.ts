import { Component, OnInit } from '@angular/core';
import { FlowService } from './flow.service';
@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {

  
 constructor(private flowService:FlowService) { }

  ngOnInit(): void {
  }

}
