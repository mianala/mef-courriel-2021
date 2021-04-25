import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() user: User = new User();
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  verify() {
    this.userService.verifyUser(this.user.id);
  }

  delete() {
    this.userService.desactivateUser(this.user);
  }

  transfer() {}
}
