import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { IEntity } from 'src/app/interfaces/ientity';

@Component({
  selector: 'entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
})
export class EntityComponent implements OnInit {
  entities: IEntity[] = [];
  get_entities_query = gql`
    query get_entities {
      entity {
        id
        id_text
        long
        short
        active
        numero
        received_count
        sent_count
        sub_entities_count
        labels
      }
    }
  `;
  
  constructor() {}

  ngOnInit(): void {}
}
