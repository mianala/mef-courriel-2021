import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/app/users/user.service';
import { Entity } from 'src/app/classes/entity';
import { FlowService } from '../../flow.service';

@Component({
  selector: 'save-flow-form',
  templateUrl: './save-flow-form.component.html',
  styleUrls: ['./save-flow-form.component.scss'],
})
export class SaveFlowFormComponent implements OnInit {
  saveFlowForm = new FormGroup({});
  userEntity = new Entity();

  constructor(private flowService: FlowService, private fb: FormBuilder, private userService:UserService) {
    
  }

  ngOnInit(): void {
    this.saveFlowForm = this.fb.group({
      content: [
        'Observation',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
      title: [
        'Objet',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
      reference: [
        'Reference',
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      type_text: ['Originale'],
      letter_text: ['Lettre'],
      numero: [
        1351,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      project_owner_text: [
        'Cifag',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      date: [
        new Date(),
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      date_received: [
        new Date(),
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  }

  files: any[] = [];

  getFiles(files: any[]) {
    this.files = files;
  }

  removeFile(file: any) {
    this.files.splice(this.files.indexOf(file), 1);
    console.log(this.files);
  }

  preview() {}

  submit() {
    const form = this.saveFlowForm.value;
    const form_files: { name: string; size: number; type: string }[] = [];

    this.files.forEach((file) => {
      form_files.push({
        name: file.name,
        size: file.size,
        type: file.type,
      });
    });

    const variables = {
      project_date: form.date,
      owner_id: 6,
      project_owner_id: 6, //
      type_text: form.type_text,
      letter_text: form.letter_text,
      title: form.title,
      reference: form.reference,
      numero: form.numero.toString(),
      action: 1,
      user_id: 21,
      content: form.content,
      project_owner_text: form.project_owner_text,
      files: {
        data: form_files,
      },
    };

    this.flowService
      .saveProjectFlowFiles(variables)
      .subscribe(this.flowSaved.bind(this));
  }

  flowSaved(data: any) {
    console.log(data);
  }

  save() {}

  entitySelected(entity: Entity) {
    this.saveFlowForm.patchValue({
      project_owner_id: entity.id,
      project_owner_text: entity.short_header,
    });
  }

  typingEntity(e: Event) {
    console.log(e);
    this.saveFlowForm.patchValue({
      project_owner_id: 0,
      // project_owner_text: entity.short_header,
    });
  }
}
