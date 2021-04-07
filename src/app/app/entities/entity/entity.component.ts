import { Component, Input, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { IEntity } from 'src/app/interfaces/ientity';
import { EntityService } from '../service/entity.service';

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
