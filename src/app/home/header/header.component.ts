import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/app/users/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  logged_in = false;
  constructor(private userService: UserService) {
    this.userService.active_user.subscribe((user) => {
      this.logged_in = user.id > 0;
    });
  }

  ngOnInit(): void {}
}
