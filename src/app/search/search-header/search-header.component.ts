import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Link } from 'src/app/classes/link';
import { EntityService } from 'src/app/services/entity.service';
import { FlowService } from 'src/app/courriel/flows/flow.service';
import { UserService } from 'src/app/services/user.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
})
export class SearchHeaderComponent implements OnInit {
  Link = Link;
  toggleSidenav$$ = this.searchService.toggleSidenav$$;
  query$ = this.route.queryParams.pipe(map((data: any) => data.q));
  queryParams$ = this.route.queryParams;
  searchKeys$ = this.queryParams$.pipe(map((keys) => Object.keys(keys).length));
  constructor(
    public flowService: FlowService,
    private entityService: EntityService,
    public userService: UserService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {}
}
