import { Component,Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-save-flow-dialog',
  templateUrl: './save-flow-dialog.component.html',
  styleUrls: ['./save-flow-dialog.component.scss'],
})
export class SaveFlowDialogComponent implements OnInit {

  flow = {
    action: 'saved',
    content: 'saved',
    date: new Date(),
  }

  project = {
    title: '',
    reference: '',
    type_text: '',
    letter: '',
    numero: '',
    owner_text: '', // sender
    date: new Date(),
    date_received: new Date(),
  }

  constructor(public dialogRef: MatDialogRef<SaveFlowDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  getFiles(files:any){

  }  
  ngOnInit(): void {}

  preview(){
    
  }

  save(){

  }


}
