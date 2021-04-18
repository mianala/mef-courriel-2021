import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss']
})
export class ResultItemComponent implements OnInit {
  @Input() item
  constructor() { }
  Math = Math
  ngOnInit(): void {
  }

}
