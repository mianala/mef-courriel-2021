import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-save-flow-dialog',
  templateUrl: './save-flow-dialog.component.html',
  styleUrls: ['./save-flow-dialog.component.scss'],
})
export class SaveFlowDialogComponent implements OnInit {
  saveFlowForm = new FormGroup({
    content: new FormControl('saved', [
      Validators.required,
      Validators.minLength(4),
    ]),
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    reference: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    type_text: new FormControl(''),
    letter_text: new FormControl(''),
    numero: new FormControl(1351, [
      Validators.required,
      Validators.minLength(1),
    ]),
    owner_text: new FormControl('Cifag', [
      Validators.required,
      Validators.minLength(3),
    ]),
    date: new FormControl(new Date()),
    date_received: new FormControl(new Date()),
  });

  mutation = gql`
    mutation newSavedProject(
      $type_text: String = "Video"
      $title: String = "Title"
      $reference: String = "12"
      $letter_text: String = "Lettre"
      $date_received: date = "1992-10-09T00:00:00Z"
      $date1: date = "1992-10-09T00:00:00Z"
      $action: Int = 10
      $owner_id: Int = 4
      $user_id: Int = 15
      $numero: String = "3512"
      $owner_text: String = "CIFAG"
      $owner_id1: Int = 4
      $initiator_id: Int = 4
      $files: file_arr_rel_insert_input = {
        data: [{ name: "File", size: 10 }, { name: "File", size: 10 }]
      }
    ) {
      insert_project(
        objects: {
          date: $date1
          date_received: $date_received
          reference: $reference
          title: $title
          type_text: $type_text
          letter_text: $letter_text
          numero: $numero
          owner_text: $owner_text
          owner_id: $owner_id1
          flows: {
            data: {
              action: $action
              owner_id: $owner_id
              user_id: $user_id
              files: $files
              initiator_id: $initiator_id
            }
          }
        }
      ) {
        returning {
          id
          flows {
            id
            files {
              id
            }
          }
        }
      }
    }
  `;
  constructor(
    public dialogRef: MatDialogRef<SaveFlowDialogComponent>,
    private apollo: Apollo
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  getFiles(files: Event) {
    console.log(files)
  }

  ngOnInit(): void {}

  preview() {}

  submit() {
    const form = this.saveFlowForm.value;
    this.apollo
      .mutate({
        mutation: this.mutation,
        variables: {
          date1: form.date,
          owner_id: 4,
          owner_id1: 4,
          type_text: form.type_text,
          letter_text: form.letter_text,
          title: form.title,
          reference: form.reference,
          numero: form.numero.toString(),
          action: 1,
          user_id: 15,
          owner_text: form.owner_text,
          files: {
            data: [
              { name: 'New File', size: 10 },
              { name: 'New File', size: 10 },
            ],
          },
        },
      })
      .subscribe((data) => {
        next: console.log(data);
      });
  }

  save() {}
}
