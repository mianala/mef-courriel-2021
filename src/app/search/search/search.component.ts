import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FlowService } from 'src/app/app/flows/flow.service';
import { UserService } from 'src/app/services/user.service';
import { Entity } from 'src/app/classes/entity';
import { SearchService } from '../search.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchResultComponent implements OnInit {
  loading: boolean;
  entity: Entity = new Entity();
  @Input() query: string = '';

  activeEntityFilter$ = this.searchService.activeEntityFilter$;
  activeLabelFilter$ = this.searchService.activeLabelFilter$;

  results$ = this.flowService.searchAppResult$;

  filteredResult$ = combineLatest([
    this.activeEntityFilter$,
    this.results$,
    this.activeLabelFilter$,
  ]).pipe(
    map(([entityFilter, results, labelFilter]) => {
      return results.filter((flow: any) => {
        console.log(
          'label',
          labelFilter,
          'entity',
          entityFilter,
          'results',
          results
        );

        return entityFilter
          ? labelFilter
            ? flow.labels.includes(labelFilter) &&
              flow.initiator_id == entityFilter
            : flow.initiator_id == entityFilter
          : labelFilter
          ? flow.labels.includes(labelFilter)
          : true;
      });
    })
  );

  constructor(
    public flowService: FlowService,
    private searchService: SearchService,
    public userService: UserService,
    route: ActivatedRoute
  ) {
    this.loading = true;

    route.queryParams.subscribe((data) => {
      this.loading = true;
      this.results$.next([]);

      let searchFilters: any = { _and: {} };

      const entityFilter = parseInt(data.e) ? parseInt(data.e) : 0;
      const labelFilter = data.l ? data.l : '';
      const query = data.q ? data.q : '';

      query &&
        (searchFilters._and._or = [
          { title: { _ilike: `%${query}%` } },
          { content: { _ilike: `%${query}%` } },
          { labels: { _ilike: `%${query}%` } },
          { initiator_text: { _ilike: `%${query}%` } },
          { reference: { _ilike: `%${query}%` } },
        ]);

      entityFilter && (searchFilters._and.initiator_id = { _eq: entityFilter });
      labelFilter && (searchFilters._and.labels = { _eq: labelFilter });

      console.log('searchFilters', searchFilters);

      this.flowService.searchApp(searchFilters, () => {
        this.loading = false;
      });
    });
  }

  ngOnInit(): void {}

  filterEntity() {}
}
