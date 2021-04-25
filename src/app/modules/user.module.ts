import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityUsersComponent } from '../app/entities/entity-users/entity-users.component';
import { UsersChipAutocompleteComponent } from '../app/users/components/users-chip-autocomplete/users-chip-autocomplete.component';
import { EditUserComponent } from '../app/users/edit-user/edit-user.component';
import { UserResetPasswordComponent } from '../app/users/logged-in-user-reset-password/user-reset-password.component';
import { UserPageComponent } from '../app/users/user-page/user-page.component';
import { UserComponent } from '../app/users/user/user.component';
import { UsersComponent } from '../app/users/users.component';

@NgModule({
  declarations: [
    UserPageComponent,
    UserResetPasswordComponent,
    EditUserComponent,
    UsersChipAutocompleteComponent,
    UserComponent,
    EntityUsersComponent,
    UsersComponent,
  ],
  imports: [CommonModule],
})
export class UserModule {}
