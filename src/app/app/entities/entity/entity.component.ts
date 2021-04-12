import { Component, Input, OnInit } from '@angular/core';
import { Entity } from 'src/app/classes/entity';

@Component({
  selector: 'entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
})
export class EntityComponent implements OnInit {
  @Input() entity: Entity  = new Entity()
  constructor() {}

  ngOnInit(): void {

  }
}
