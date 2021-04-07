import { Component, OnInit } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { IEntity } from 'src/app/interfaces/ientity';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss'],
})
export class EntitiesComponent implements OnInit {

  getEntitiesQuery = gql`
    query get_entities {
      entity {
        id
        id_text
        long
        short
        numero
        sent_count
        received_count
        active
        short_header
        long_header
        labels
        sub_entities_count
      }
    }
  `;

entities:IEntity[] = []

  constructor(private apollo:Apollo) {}

  ngOnInit(): void {

    this.apollo.query({
      query: this.getEntitiesQuery,
    }).subscribe(data => {
      next: this.getEntities(data.data)
    })
  }

  getEntities(data:any)
  {
    this.entities = data.entity
    console.log(data)
  }

}
