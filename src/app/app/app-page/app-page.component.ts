import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.scss']
})
export class AppPageComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
    this.userService.logged_in.subscribe(logged_in => {
      if (!logged_in) {
        router.navigate(['/'])
      }
    })
  }

  ngOnInit(): void {
  }

}
