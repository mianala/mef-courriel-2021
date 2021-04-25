import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'back',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit {
  refreshed: boolean = true;
  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  back(): void {
    // this.router.navigate([document.referrer], {
    //   relativeTo: this.route,
    // });

    this.location.back();
  }

  ngOnInit(): void {}
}
