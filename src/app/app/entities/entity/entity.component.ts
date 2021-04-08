import { Component, Input, OnInit } from '@angular/core';
import { IEntity } from 'src/app/interfaces/ientity';

@Component({
  selector: 'entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
})
export class EntityComponent implements OnInit {
  @Input() entity: IEntity | undefined
  constructor() {}

  ngOnInit(): void {

  }
}
