import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app/users/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  logged_in = false;
  constructor(private userService: UserService) {
    this.userService.active_user.subscribe((user) => {
      this.logged_in = user.id > 0;
    });
  }

  ngOnInit(): void {}
}
