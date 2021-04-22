import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../app/users/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {
    this.userService.active_user.subscribe((user) => {
      const logged_in = user.id > 0;
      if (logged_in) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {}
}
