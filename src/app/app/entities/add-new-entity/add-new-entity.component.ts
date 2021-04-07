import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { IEntity } from 'src/app/interfaces/ientity';

@Component({
  selector: 'app-add-new-entity',
  templateUrl: './add-new-entity.component.html',
  styleUrls: ['./add-new-entity.component.scss']
})
export class AddNewEntityComponent implements OnInit {
  entity_id: number | undefined
  entity: IEntity | undefined

  get_entity_query = gql`
    query get_entity($if) {
      entity(where: { id: { _eq: $id }) {
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
  
  newNewEntityForm = new FormGroup({
    short: new FormControl(),
    long: new FormControl(),
  });
  
  constructor(private route: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit(): void {
    console.log('init')
    this.entity_id = this.route.snapshot.params.entity_id;

    this.apollo.query({
      query: this.get_entity_query,
      variables:{id:this.entity_id}
    }).subscribe(data => {
      next: this.getEntity(data.data)
    })
  }

  getEntity(data:any)
  {
    this.entity = data.entity[0]
    console.log(data)
  }



}
