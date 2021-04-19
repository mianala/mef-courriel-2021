import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Entity } from 'src/app/classes/entity';
import { EntityService } from '../service/entity.service';

@Component({
  selector: 'app-edit-entity',
  templateUrl: './edit-entity.component.html',
  styleUrls: ['./edit-entity.component.scss']
})
export class EditEntityComponent implements OnInit {
  entity_id: number = 0;
  entity: Entity = new Entity();

  editEntityForm = new FormGroup({
    short: new FormControl('', [Validators.required]),
    long: new FormControl('', [Validators.required]),
    level: new FormControl(0, [Validators.required]),
    short_header: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService
  ) {

    this.route.queryParams.subscribe(data => {
      this.entity_id = parseInt(data.entity_id);
      this.entityService.getEntity(this.entity_id).subscribe(this.getEntity.bind(this));
    })
  }

  ngOnInit(): void {

  }

  getEntity(data: any) {

    Object.assign(this.entity, data[0]);

    this.editEntityForm.patchValue({
      level: this.entity.level,
      short: this.entity.short,
      long: this.entity.long,
      short_header: this.entity.short_header,
    });
  }

  submit() {
    const form = this.editEntityForm.value;

    const updatedEntity = { ...{ id: this.entity.id }, ...form }

    this.entityService.updateEntityInfo(updatedEntity)
  }

}
