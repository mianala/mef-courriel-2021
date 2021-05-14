import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from 'src/app/classes/link';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-courriel-page',
  templateUrl: './courriel-root.component.html',
  styleUrls: ['./courriel-root.component.scss'],
})
export class CourrielRootComponent implements OnInit {
  Link = Link;
  constructor(public userService: UserService, public router: Router) {
    this.userService.loggedIn$.subscribe((logged_in) => {
      if (!logged_in) {
        router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {}
}
