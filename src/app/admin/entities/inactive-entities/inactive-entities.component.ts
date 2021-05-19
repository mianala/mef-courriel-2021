import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Entity } from 'src/app/classes/entity';
import { Link } from 'src/app/classes/link';
import { EntityService } from 'src/app/services/entity.service';

@Component({
  selector: 'app-inactive-entities',
  templateUrl: './inactive-entities.component.html',
  styleUrls: ['./inactive-entities.component.scss'],
})
export class InactiveEntitiesComponent implements OnInit {
  filter = new FormControl('');
  Link = Link;
  filteredEntities$ = combineLatest([
    this.entityService.inactiveEntities$,
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
