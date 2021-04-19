import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  user: User = new User()
  constructor(private userService: UserService, private route: ActivatedRoute) {
    userService.active_user.subscribe(user => this.user = user)
  }

  ngOnInit(): void {
  }

}
