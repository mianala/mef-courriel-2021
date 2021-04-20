import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.scss']
})
export class SearchHomeComponent implements OnInit {
  @Input() query = ""
  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  submit() {
  }
}