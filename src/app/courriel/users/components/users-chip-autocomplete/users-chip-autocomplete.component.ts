import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { User } from 'src/app/classes/user';
import { UserService } from '../../../../services/user.service';

/**
 * @title Users Chip Autocomplete
 */
@Component({
  selector: 'app-users-chip-autocomplete',
  templateUrl: './users-chip-autocomplete.component.html',
  styleUrls: ['./users-chip-autocomplete.component.scss'],
})
export class UsersChipAutocompleteComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredEntities: User[] = [];
  users_text: string[] = [];

  @Input() users: User[] = [];
  @Output() usersChange: EventEmitter<User[]> = new EventEmitter();

  allUsers!: User[];

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  constructor(private userService: UserService) {
    this.userService.users$.subscribe((e) => {
      this.allUsers = e;
      this.filteredEntities = e;
    });

    this.userCtrl.valueChanges.subscribe((e) => {
      this._filter(e);
    });
  }

  ngOnInit(): void {}

  remove(user: User): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  selected(e: User): void {
    this.users.push(new User(e));
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue('');
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredEntities = this.allUsers.filter((user) => {
      user.lastname.toLowerCase().includes(filterValue) ||
        user.firstname.toLowerCase().includes(filterValue);
    });
  }
}
