import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.scss'],
})
export class InactiveUsersComponent implements OnInit {
  inactiveUsers$ = this.userService.inactivatedUsers$;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}
}
