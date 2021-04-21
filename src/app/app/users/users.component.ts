import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { User } from 'src/app/classes/user';
import { UserService } from './user.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsers()
  }
}
