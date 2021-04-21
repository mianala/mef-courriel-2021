import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityService } from 'src/app/app/entities/service/entity.service';
import { FlowService } from 'src/app/app/flow/flow.service';
import { UserService } from 'src/app/app/users/user.service';
import { Flow } from 'src/app/classes/flow';

@Component({
  selector: 'search-results',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  loading = true
  @Input() query: string = ""

  results: Flow[] = [];
  constructor(private flowService: FlowService, private entityService: EntityService, private userService: UserService, route: ActivatedRoute) {

    route.queryParams.subscribe(data => {
      this.query = data.q;
      this.search()
    })
  }

  ngOnInit(): void {

  }

  search() {
    let searchFilters: any = {}

    this.query.length ? searchFilters.project = { title: { _ilike: `%${this.query}%` } } : null

    // searchFilters.owner_id = { _eq: this.entityService.active_entity.value.id }

    console.log("searching", searchFilters)

    Object.keys(searchFilters).length && this.flowService.search(searchFilters)
      .subscribe(flows => {
        this.results = flows
        this.loading = false
        console.log(flows)
      })
  }

  logout() {
    this.userService.logout()
  }
}
