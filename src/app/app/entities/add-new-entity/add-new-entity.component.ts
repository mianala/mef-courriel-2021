import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-entity',
  templateUrl: './add-new-entity.component.html',
  styleUrls: ['./add-new-entity.component.scss'],
})
export class AddNewEntityComponent implements OnInit {
  entity_id: number | undefined;

  newEntityForm = new FormGroup({
    short: new FormControl(),
    long: new FormControl(),
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.entity_id = this.route.snapshot.params.entity_id;
  }
}
