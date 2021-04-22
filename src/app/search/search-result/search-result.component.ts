import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeNestedDataSource,
} from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { skip } from 'rxjs/operators';
import { EntityService } from 'src/app/app/entities/service/entity.service';
import { FlowService } from 'src/app/app/flow/flow.service';
import { UserService } from 'src/app/app/users/user.service';
import { Entity } from 'src/app/classes/entity';
import { Flow } from 'src/app/classes/flow';

@Component({
  selector: 'search-results',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  loading = true;
  entity: Entity = new Entity();
  @Input() query: string = '';

  results: Flow[] = [];
  constructor(
    private flowService: FlowService,
    private entityService: EntityService,
    private userService: UserService,
    route: ActivatedRoute
  ) {
    route.queryParams.subscribe((data) => {
      this.query = data.q;
      this.search();
    });

    this.entityService.active_entity.pipe(skip(1)).subscribe((entity: any) => {
      this.entity = entity;
      this.dataSource.data = entity.children;
      console.log(entity);
    });
  }

  ngOnInit(): void {}

  search() {
    let searchFilters: any = {};

    this.query.length
      ? (searchFilters.title = { _ilike: `%${this.query}%` })
      : null;

    // searchFilters.owner_id = { _eq: this.entityService.active_entity.value.id }

    console.log('searching', searchFilters);

    Object.keys(searchFilters).length &&
      this.flowService.search(searchFilters).subscribe((flows) => {
        this.results = flows;
        this.loading = false;
      });
  }

  logout() {
    this.userService.logout();
  }

  treeControl = new NestedTreeControl<Entity>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Entity>();

  hasChild = (_: number, node: Entity) =>
    !!node.children && node.children.length > 0;
}
