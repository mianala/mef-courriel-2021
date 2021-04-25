import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-app-page',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss'],
})
export class AppPageComponent implements OnInit {
  constructor(public userService: UserService, private router: Router) {
    this.userService.loggedIn$.subscribe((logged_in) => {
      if (!logged_in) {
        router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {}
}
