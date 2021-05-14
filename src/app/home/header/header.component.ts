import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/classes/link';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  Link = Link;
  constructor(public userService: UserService) {}

  ngOnInit(): void {}
}
