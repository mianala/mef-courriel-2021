import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { User } from 'src/app/classes/user';
import { EntityAutocompleteComponent } from 'src/app/courriel/entities/components/entity-autocomplete/entity-autocomplete.component';

@Component({
  selector: 'app-select-users',
  templateUrl: './select-users.component.html',
  styleUrls: ['./select-users.component.scss'],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntityAutocompleteComponent),
      multi: true,
    },
  ],
})
export class SelectUsersComponent implements OnInit {
  selectedUsers: User[] = [];

  constructor() {}

  ngOnInit(): void {}
}
