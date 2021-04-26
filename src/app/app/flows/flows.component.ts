import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { Entity } from 'src/app/classes/entity';
import { Flow } from 'src/app/classes/flow';
import { EntityService } from '../entities/service/entity.service';
import { FlowService } from './flow.service';
@Component({
  selector: 'app-flow',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.scss'],
})
export class FlowsComponent implements OnInit {
  today = new Date();

  filters: {
    title: string;
    labels: string[];
    date_start: any;
    date_end?: any;
    entity: Entity;
  } = {
    title: '',
    labels: [],
    date_start: null,
    date_end: null,
    entity: new Entity(),
  };

  allRecentFlows = this.flowService.allRecentFlows$;
  appSearchFlows = this.flowService.flowSearchResult$;

  loading = true;
  searchToggle: boolean = false;

  textSearchToggle: boolean = false;
  dateRangeToggle: boolean = false;
  labelsToggle: boolean = false;
  entityToggle: boolean = false;

  queryParams = this.route.queryParams;

  flowGroup = 0;

  constructor(
    public flowService: FlowService,

    private route: ActivatedRoute,
    private router: Router,
    private entityService: EntityService
  ) {
    this.route.queryParams.subscribe((data) => {
      console.log(data);
    });

    this.flowService.refreshFlows();
  }

  ngOnInit(): void {}

  search() {
    // this.loading = true;
    let searchFilters: any = {};

    this.filters.title.length
      ? (searchFilters.title = { _ilike: `%${this.filters.title}%` })
      : null;
    this.filters.labels.length
      ? (searchFilters.labels = { _in: this.filters.labels })
      : null;
    this.filters.entity.id
      ? (searchFilters.initiator_id = { _eq: this.filters.entity.id })
      : null;
    this.filters.date_start === null
      ? this.filters.date_end === null
        ? null
        : (searchFilters.date = { _lte: this.filters.date_end })
      : this.filters.date_end === null
      ? (searchFilters.date = { _gte: this.filters.date_start })
      : (searchFilters.date = [
          { _gte: this.filters.date_start },
          { _lte: this.filters.date_end },
        ]);

    // searchFilters.owner_id = { _eq: this.entityService.active_entity.value.id }

    console.log('filters', this.filters);
    console.log('searching', searchFilters);

    Object.keys(searchFilters).length &&
      this.flowService.searchQuery(searchFilters);
  }
}
