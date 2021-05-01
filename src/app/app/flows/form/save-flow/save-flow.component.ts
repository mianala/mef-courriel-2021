import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Entity } from 'src/app/classes/entity';
import { User } from 'src/app/classes/user';
import { NotificationService } from 'src/app/services/notification.service';
import { FlowService } from '../../flow.service';
import { AppFile } from 'src/app/classes/file';

@Component({
  selector: 'save-flow-form',
  templateUrl: './save-flow.component.html',
  styleUrls: ['./save-flow.component.scss'],
})
export class SaveFlowFormComponent implements OnInit {
  saveFlowForm = new FormGroup({});
  user = new User();
  labels: string[] = [];
  loading = false;
  entity = new Entity();

  constructor(
    private flowService: FlowService,
    private fb: FormBuilder,
    private userService: UserService,
    private notification: NotificationService
  ) {
    this.user = this.userService.activeUser$.value;
  }

  ngOnInit(): void {
    this.saveFlowForm = this.fb.group({
      content: [''],
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
      labels: [[]],
      files: [[]],
      entity: [new Entity()],
      numero: [
        ,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      date: [
        new Date(),
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      date_received: [
        new Date(),
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      urgent: [
        false,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  }

  preview() {}

  submit() {
    const form = this.saveFlowForm.value;

    console.log(form);
    return;
    this.loading = true;

    const form_files: {
      name: string;
      size: number;
      type: string;
      src: string;
      lastModified: number;
    }[] = [];

    form.files.forEach((file: any) => {
      form_files.push({
        name: file.name,
        size: file.size,
        type: file.type,
        src: file.src,
        lastModified: file.lastModified.toString(),
      });
    });

    const flow_variables = {
      action: 1,
      title: form.title,
      content: form.content,
      note: form.note,
      reference: form.reference,
      labels: this.labels.join(','),
      user_id: this.user.id,
      date: form.date,
      status: form.urgent ? 1 : null,
      type_text: form.type_text,
      letter_text: form.letter_text,
      numero: form.numero,
      date_received: form.date_received,
      owner_id: this.user.entity_id,
      initiator_id: this.entity.id ? this.entity.id : null,
      initiator_text: this.entity.short,
      files: {
        data: form_files,
      },
    };

    this.flowService
      .insertFlows([flow_variables])
      .subscribe(this.flowSaved.bind(this));
  }

  flowSaved(data: any) {
    this.notification.flowSaved(data.data.insert_flow.returning[0]);
    this.flowService.refreshFlows();
    this.loading = false;
  }

  save() {}

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
    this.saveFlowForm.reset();
    this.saveFlowForm.patchValue({
      date: new Date(),
      date_received: new Date(),
    });
  }
}
