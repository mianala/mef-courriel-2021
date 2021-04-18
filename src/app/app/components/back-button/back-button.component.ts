import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'back',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {
  constructor(private location: Location) { }

  back(): void {
    this.location.back()
  }
  ngOnInit(): void {
  }

}
