import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlowService } from '../../flow.service';

@Component({
  selector: 'save-flow-form',
  templateUrl: './save-flow-form.component.html',
  styleUrls: ['./save-flow-form.component.scss'],
})
export class SaveFlowFormComponent implements OnInit {
  saveFlowForm = new FormGroup({});

  constructor(private flowService: FlowService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.saveFlowForm = this.fb.group({
      content: ['Observation', Validators.compose([Validators.required, Validators.minLength(4)])],
      title:[ 'Objet', Validators.compose([Validators.required, Validators.minLength(4)])],
      reference:[ 'Reference', Validators.compose([Validators.required, Validators.minLength(1)])],
      type_text: ['Lettre'],
      letter_text: ['Originale'],
      numero: [1351, Validators.compose([Validators.required, Validators.minLength(1)])],
      owner_text: ['Cifag', Validators.compose([Validators.required, Validators.minLength(3)])],
      date: [new Date(), Validators.compose([Validators.required, Validators.minLength(1)])],
      date_received:
        [new Date(), Validators.compose([Validators.required, Validators.minLength(1)])],
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
      date1: form.date,
      owner_id: 6,
      owner_id1: 6,
      type_text: form.type_text,
      letter_text: form.letter_text,
      title: form.title,
      reference: form.reference,
      numero: form.numero.toString(),
      action: 1,
      user_id: 21,
      content: form.content,
      owner_text: form.owner_text,
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
}
