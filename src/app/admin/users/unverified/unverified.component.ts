import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-unverified',
  templateUrl: './unverified.component.html',
  styleUrls: ['./unverified.component.scss'],
})
export class UnverifiedComponent implements OnInit {
  unverifiedUsers$ = this.userService.unverifiedUsers$;
  constructor(private userService: UserService) {}

  ngOnInit(): void {}
}
