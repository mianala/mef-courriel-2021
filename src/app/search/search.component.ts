import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../app/users/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  q: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userService.loggedIn$.subscribe((logged_in) => {
      if (!logged_in) {
        router.navigate(['/']);
      }
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (queryParams: any) => {
        this.q = queryParams.q;
      },
    });
  }
}
