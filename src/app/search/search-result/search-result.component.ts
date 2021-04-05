import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'search-results',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  @Input() query: string = ""
  constructor() { }

  ngOnInit(): void {
  }

}
