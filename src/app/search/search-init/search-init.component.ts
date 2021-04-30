import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'search-home',
  templateUrl: './search-init.component.html',
  styleUrls: ['./search-init.component.scss'],
})
export class SearchHomeComponent implements OnInit {
  @Input() query = '';
  constructor(private router: Router, public userService: UserService) {}

  ngOnInit(): void {}

  submit() {}
}
