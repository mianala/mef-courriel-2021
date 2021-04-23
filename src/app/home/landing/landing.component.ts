import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app/users/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {}
}
