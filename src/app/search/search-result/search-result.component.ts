import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeNestedDataSource,
} from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, from } from 'rxjs';
import { filter, mergeMap, skip, switchMap } from 'rxjs/operators';
import { EntityService } from 'src/app/app/entities/service/entity.service';
import { FlowService } from 'src/app/app/flows/flow.service';
import { UserService } from 'src/app/services/user.service';
import { Entity } from 'src/app/classes/entity';
import { Flow } from 'src/app/classes/flow';

@Component({
  selector: 'search-results',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  loading: boolean;
  entity: Entity = new Entity();
  @Input() query: string = '';

  activeEntityFilter$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  results$ = this.flowService.searchAppResult$;

  filteredResult$ = this.activeEntityFilter$.pipe(
    switchMap((activeEntityFilter) =>
      this.results$.pipe(
        filter((flow: any) =>
          activeEntityFilter ? flow.initiator_id == activeEntityFilter : true
        )
      )
    )
  );

  constructor(
    public flowService: FlowService,
    private entityService: EntityService,
    public userService: UserService,
    route: ActivatedRoute
  ) {
    this.loading = true;

    route.queryParams.subscribe((data) => {
      this.query = data.q;
      this.search();
    });

    this.entityService.activeEntity$.subscribe((entity: any) => {
      this.entity = entity;
      this.dataSource.data = entity.children;
      console.log(entity);
    });
  }

  ngOnInit(): void {}

  search() {
    this.loading = true;
    this.results$.next([]);

    let searchFilters: any = {};

    this.query?.length
      ? (searchFilters.title = { _ilike: `%${this.query}%` })
      : null;

    // searchFilters.owner_id = { _eq: this.entityService.active_entity.value.id }

    console.log('searching', searchFilters);

    Object.keys(searchFilters).length &&
      this.flowService.searchApp(searchFilters, () => {
        this.loading = false;
      });
  }

  filterEntity() {}

  setActiveEntityFilter(entity_id: number) {
    this.activeEntityFilter$.next(entity_id);
  }

  resetActiveEntityFilter() {
    this.activeEntityFilter$.next(0);
  }

  treeControl = new NestedTreeControl<Entity>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Entity>();

  hasChild = (_: number, node: Entity) =>
    !!node.children && node.children.length > 0;
}
