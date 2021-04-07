import { Component, Inject, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { nextTick } from 'node:process';

@Component({
  selector: 'app-save-flow-dialog',
  templateUrl: './save-flow-dialog.component.html',
  styleUrls: ['./save-flow-dialog.component.scss'],
})
export class SaveFlowDialogComponent implements OnInit {
  saveFlowForm = new FormGroup({
    action: new FormControl('saved'),
    content: new FormControl('saved'),
    title: new FormControl(''),
    reference: new FormControl(''),
    type_text: new FormControl(''),
    letter_text: new FormControl(''),
    numero: new FormControl(1351),
    owner_text: new FormControl(''), 
    date: new FormControl(new Date()),
    date_received: new FormControl(new Date()),
  });

  constructor(public dialogRef: MatDialogRef<SaveFlowDialogComponent>, private apollo:Apollo) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  getFiles(files: any) {}
  ngOnInit(): void {}

  preview() {}

  submit() {
    const mutation = gql`

    `
    this.apollo.mutate({
      mutation: mutation,
    })
    .subscribe(data => {
      next: console.log(data)
    })
  }

  save() {}
}
