import { Component, Input, OnInit } from '@angular/core';
import { Flow } from 'src/app/classes/flow';

@Component({
  selector: 'result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss']
})
export class ResultItemComponent implements OnInit {
  @Input() flow: Flow

  constructor() {
    this.flow = new Flow()

  }
  Math = Math
  ngOnInit(): void {

    console.log(this.flow);


  }

}
