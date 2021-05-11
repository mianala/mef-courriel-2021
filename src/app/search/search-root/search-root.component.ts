import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { EntityService } from 'src/app/courriel/entities/service/entity.service';
import { FlowService } from 'src/app/courriel/flows/flow.service';
import { Entity } from 'src/app/classes/entity';
import { UserService } from 'src/app/services/user.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search-root.component.html',
  styleUrls: ['./search-root.component.scss'],
})
export class SearchPageComponent implements OnInit {
  queryParams$ = this.route.queryParams;
  openedSidenav$ = this.searchService.openSideNav$;
  allLabels$ = this.entityService.activeEntityLabels$;

  searchKeys$ = this.queryParams$.pipe(map((keys) => Object.keys(keys).length));

  constructor(
    public flowService: FlowService,
    private entityService: EntityService,
    private searchService: SearchService,
    public userService: UserService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.entityService.activeEntity$.subscribe((entity: any) => {
      this.dataSource.data = entity.children;
    });

    this.userService.loggedIn$.subscribe((value) =>
      value ? null : this.router.navigate(['/auth/login'])
    );
  }

  treeControl = new NestedTreeControl<Entity>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Entity>();

  hasChild = (_: number, node: Entity) =>
    !!node.children && node.children.length > 0;
  ngOnInit(): void {}
}
