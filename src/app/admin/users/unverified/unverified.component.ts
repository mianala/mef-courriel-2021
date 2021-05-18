import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-unverified',
  templateUrl: './unverified.component.html',
  styleUrls: ['./unverified.component.scss'],
})
export class UnverifiedComponent implements OnInit {
  filter = new FormControl('');
  filteredUsers$ = combineLatest([
    this.userService.unverifiedUsers$,
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

  ngOnInit(): void {}
}
