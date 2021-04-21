import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/app/users/user.service';
import { Entity } from 'src/app/classes/entity';
import { User } from 'src/app/classes/user';
import { NotificationService } from 'src/app/services/notification.service';
import { FlowService } from '../../flow.service';

@Component({
  selector: 'save-flow-form',
  templateUrl: './save-flow-form.component.html',
  styleUrls: ['./save-flow-form.component.scss'],
})
export class SaveFlowFormComponent implements OnInit {
  saveFlowForm = new FormGroup({});
  user = new User();
  labels: string[] = [];

  constructor(
    private flowService: FlowService,
    private fb: FormBuilder,
    private userService: UserService,
    private notification: NotificationService,
  ) {
    this.user = this.userService.active_user.value;
  }

  ngOnInit(): void {
    this.saveFlowForm = this.fb.group({
      content: [
        ''],
      title: [
        '',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
      reference: [
        '',
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      type_text: ['Originale'],
      letter_text: ['Lettre'],
      note: [''],
      numero: [
        ,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      project_owner_text: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      project_owner_id: [null],
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



  preview() { }

  submit() {
    const form = this.saveFlowForm.value;
    const form_files: { name: string; size: number; type: string; src: string, lastModified: number }[] = [];

    this.files.forEach((file) => {
      form_files.push({
        name: file.name,
        size: file.size,
        type: file.type,
        src: file.src,
        lastModified: file.lastModified.toString(),
      });
    });

    const project_insert_input = {
      date: form.date,
      date_received: form.date_received,
      reference: form.reference,
      title: form.title,
      type_text: form.type_text,
      letter_text: form.letter_text,
      numero: form.numero.toString(),
      owner_text: form.project_owner_text,
      owner_id: form.project_owner_id,
      flows: {
        data: {
          action: 1,
          owner_id: this.user.entity_id,
          user_id: this.user.id,
          note: form.note,
          initiator_text: form.project_owner_text,
          content: form.content,
          title: form.title,
          reference: form.reference,
          labels: this.labels.join(','),
          initiator_id: form.project_owner_id,
          files: {
            data: form_files
          },
        }
      }
    }

    this.flowService
      .saveProjectFlowFiles(project_insert_input)
      .subscribe(this.flowSaved.bind(this));
  }

  flowSaved(data: any) {
    this.notification.flowSaved(data.data.insert_project.returning[0])

    this.flowService.refreshFlows()
  }

  save() { }

  entitySelected(entity: Entity) {
    this.saveFlowForm.patchValue({
      project_owner_id: entity.id,
      project_owner_text: entity.short_header,
    });
  }

  typingEntity(e: String) {
    this.saveFlowForm.patchValue({
      project_owner_id: null,
      project_owner_text: e,
    });
  }

  _keypress() {
    this.saveFlowForm.patchValue({ project_owner_id: 0 });
  }

  reset() {
    this.saveFlowForm.reset()
    this.files = []
    this.saveFlowForm.patchValue({
      date: new Date(),
      date_received: new Date(),
    })
  }
}
