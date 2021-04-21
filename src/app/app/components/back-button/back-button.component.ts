import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'back',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {

  constructor(private location: Location, private router: Router, private route: ActivatedRoute) { }

  back(): void {

    // this.location.back()

    this.router.navigate([".."], {
      relativeTo: this.route
    })
    // this.router.navigate([".."]);
  }
  ngOnInit(): void {
  }

}
