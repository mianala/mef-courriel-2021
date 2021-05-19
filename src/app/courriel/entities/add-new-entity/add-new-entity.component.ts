import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Entity } from 'src/app/classes/entity';
import { EntityService } from 'src/app/services/entity.service';

@Component({
  selector: 'app-add-new-entity',
  templateUrl: './add-new-entity.component.html',
  styleUrls: ['./add-new-entity.component.scss'],
})
export class AddNewEntityComponent implements OnInit {
  parent_entity_id: number = 0;
  parent_entity: Entity = new Entity();

  parentEntity = new FormControl();

  newNewEntityForm = new FormGroup({
    short: new FormControl('', [Validators.required]),
    long: new FormControl('', [Validators.required]),
    level: new FormControl(0, [Validators.required]),
    short_header: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService
  ) {
    this.route.queryParams.subscribe((data) => {
      this.parent_entity_id = parseInt(data.entity_id);
      this.entityService
        .getEntity(this.parent_entity_id)
        .subscribe(this.getEntity.bind(this));
    });
  }

  ngOnInit(): void {}

  getEntity(entities: Entity[]) {
    Object.assign(this.parent_entity, entities[0]);

    this.newNewEntityForm.patchValue({
      level: this.parent_entity.level + 1,
    });
  }

  submit() {
    const form = this.newNewEntityForm.value;
    const short_header =
      this.parent_entity.short_header + '/' + form.short_header;

    const variables = {
      level: parseInt(form.level),
      short: parseInt(form.short),
      long: form.long,
      short_header: short_header,
      id_text:
        this.parent_entity.id_text +
        '-' +
        (this.parent_entity.sub_entities_count + 1),
      parent_entity_id: this.parent_entity_id,
    };

    this.entityService.addNewEntity(variables).subscribe((data) => {
      next: this.entityAdded(data);
    });
  }

  entityAdded(data: any) {
    this.parent_entity.sub_entities_count += 1;
  }
}
