import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from 'src/app/classes/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  filter = new FormControl('');
  filteredUsers$ = combineLatest([
    this.userService.activeAndVerifiedUsers$,
    this.filter.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([users, query]) => {
      const q = new RegExp(query, 'i');

      return users.filter((user: User) => {
        return (
          user.entity.short.match(q) ||
          user.firstname.match(q) ||
          user.lastname.match(q)
        );
      });
    })
  );
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers();
  }
}
