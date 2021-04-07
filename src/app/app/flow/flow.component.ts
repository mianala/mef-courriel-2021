import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SaveFlowDialogComponent } from './dialogs/save-flow-dialog/save-flow-dialog.component';
@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openSaveDialog(){
    const dialogRef = this.dialog.open(SaveFlowDialogComponent, {
      width: '600px',
      height: '680px',
    })
  }


  openComposeDialog(){

  }
}
