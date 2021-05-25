import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entity } from 'src/app/classes/entity';
import { FileService } from 'src/app/services/file.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { FlowService } from '../../flow.service';

@Component({
  selector: 'save-flow-form',
  templateUrl: './save-flow.component.html',
  styleUrls: ['./save-flow.component.scss'],
})
export class SaveFlowFormComponent implements OnInit {
  saveFlowForm = new FormGroup({});
  loading = false;
  user = this.userService._activeUser;

  constructor(
    private flowService: FlowService,
    private fb: FormBuilder,
    private fileUploadService: FileService,
    private userService: UserService,
    private notification: NotificationService
  ) {}

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

    // push files to files || why not inside files component? Because it will be used everywhere and this isn't
  }

  preview() {}

  submit() {
    const form = this.saveFlowForm.value;
    console.log(form);

    this.loading = true;

    const form_files: {
      name: string;
      size: number;
      type: string;
      src: string;
      destination: string;
      filename: string;
      lastModified: number;
    }[] = [];

    form.files.forEach((file: any) => {
      form_files.push({
        name: file.name,
        size: file.size,
        destination: file.destination,
        filename: file.filename,
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
      labels: form.labels.join(','),
      user_id: this.user?.id,
      date: form.date,
      status: form.urgent ? 1 : null,
      type_text: form.type_text,
      letter_text: form.letter_text,
      numero: form.numero,
      date_received: form.date_received,
      owner_id: this.user?.entity_id,
      initiator_id: form.entity.id ? form.entity.id : null,
      initiator_text: form.entity.short,
      files: {
        data: form_files,
      },
    };

    this.flowService
      .insertFlows([flow_variables])
      .subscribe(this.flowSaved.bind(this));
  }

  flowSaved(data: any) {
    this.fileUploadService.files$.next([]);
    this.fileUploadService.progress$.next(null);
    this.notification.flowSaved(data.data.insert_flow.returning[0]);
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
