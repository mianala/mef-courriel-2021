import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'back',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit {
  refreshed: boolean = true;
  constructor(private location: Location) {}

  back(): void {
    // this.router.navigate([document.referrer], {
    //   relativeTo: this.route,
    // });

    this.location.back();
  }

  ngOnInit(): void {}
}
