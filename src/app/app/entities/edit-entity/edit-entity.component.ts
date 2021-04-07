import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-entity',
  templateUrl: './edit-entity.component.html',
  styleUrls: ['./edit-entity.component.scss']
})
export class EditEntityComponent implements OnInit {
  entity_id: number | undefined;

  editEntityForm = new FormGroup({
    short: new FormControl(),
    long: new FormControl(),
  });
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.entity_id = this.route.snapshot.params.entity_id;
  }

}
