import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Entity } from 'src/app/classes/entity';
import { Link } from 'src/app/classes/link';
import { User } from 'src/app/classes/user';
import { EntityService } from './service/entity.service';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss'],
})
export class EntitiesComponent implements OnInit {
  filter = new FormControl('');
  Link = Link;
  filteredEntities$ = combineLatest([
    this.entityService.allEntities$,
    this.filter.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([entities, query]) => {
      const q = new RegExp(query, 'i');

      return entities.filter((entity: Entity) => {
        return entity.short.match(q) || entity.long.match(q);
      });
    })
  );

  constructor(public entityService: EntityService) {}

  ngOnInit(): void {}
}
