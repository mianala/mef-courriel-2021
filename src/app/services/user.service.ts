import { Injectable } from '@angular/core';
import { _MatTabGroupBase } from '@angular/material/tabs';
import { NavigationEnd, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, map } from 'rxjs/operators';
import { Entity } from 'src/app/classes/entity';
import { User } from 'src/app/classes/user';
import { NotificationService } from 'src/app/services/notification.service';
import { Link } from '../classes/link';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // save in cookie no sensitive data
  activeUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  activeUserEntityId$ = this.activeUser$.pipe(
    filter((user) => !!user),
    map((user) => user!.entity.id),
    distinctUntilChanged()
  );

  _activeUser: User | null = null;

  users$ = this.getUsers();
  loggedIn$ = this.activeUser$.pipe(map((user) => (user ? true : false)));

  loggedOut$ = this.loggedIn$.pipe(
    distinctUntilChanged(),
    map((current) => !current)
  );

  constructor(
    private apollo: Apollo,
    private notification: NotificationService,
    private router: Router
  ) {
    const localStorageUser =
      localStorage.getItem('user') !== null
        ? new User(JSON.parse(localStorage.getItem('user') || '[]'))
        : null; // redirect to login

    if (localStorageUser !== null) {
      console.log('active user from localstorage');
      this.activeUser$.next(localStorageUser);
    }

    this.activeUser$.subscribe((user) => (this._activeUser = user));
  }

  saveNewUser(variables: any) {
    const SAVE_NEW_USER_MUTATION = gql`
      mutation new_user(
        $im: Int!
        $lastname: String!
        $phone: String!
        $title: String!
        $username: String!
        $hashed: String!
        $email: String!
        $firstname: String!
        $entity_id: Int!
      ) {
        insert_user(
          objects: {
            im: $im
            lastname: $lastname
            phone: $phone
            title: $title
            username: $username
            hashed: $hashed
            email: $email
            firstname: $firstname
            entity_id: $entity_id
          }
        ) {
          returning {
            id
          }
        }
      }
    `;

    return this.apollo.mutate({
      mutation: SAVE_NEW_USER_MUTATION,
      variables: variables,
    });
  }

  getUsers() {
    const GET_USERS_QUERY = gql`
      ${User.core_user_fields}
      ${Entity.CORE_ENTITY_FIELDS}
      query get_users {
        user {
          ...CoreUserFields
          verified
          action_counter
          entity {
            ...CoreEntityFields
          }
        }
      }
    `;
    return this.apollo
      .query({
        query: GET_USERS_QUERY,
      })
      .pipe(
        map((val: any) => {
          return val.data.user.map((val: any) => {
            return new User(val);
          });
        })
      );
  }

  getEntityUsers(entity_id: number) {
    const GET_ENTITY_USERS_QUERY = gql`
      ${User.core_user_fields}
      query get_entity_users($entity_id:Int!){
        user({where:{entity_id:{_eq:$entity_id}}}){
          ...CoreUserFields
        }
      }
    `;

    return this.apollo
      .query({
        query: GET_ENTITY_USERS_QUERY,
        variables: {
          entity_id: entity_id,
        },
      })
      .pipe(this.mapUser);
  }

  mapUser = map((val: any) => {
    return val.data.user.map((val: any) => {
      return new User(val);
    });
  });

  logIn(variables: { username: any; hashed: any }, next: () => void) {
    const USER_LOGIN_QUERY = gql`
      ${User.core_user_fields}
      ${Entity.CORE_ENTITY_FIELDS}
      query login($username: String!, $hashed: String!) {
        user(
          where: { username: { _eq: $username }, hashed: { _eq: $hashed } }
        ) {
          ...CoreUserFields
          email
          rights
          phone
          settings_default_app
          settings_default_letter_text
          settings_default_flow_page
          entity {
            ...CoreEntityFields
          }
        }
      }
    `;
    this.apollo
      .query({
        query: USER_LOGIN_QUERY,
        variables: variables,
      })
      .pipe(this.mapUser)
      .subscribe((users) => {
        this.logInHandler(users);
        next();
      });
  }

  logInHandler(users: User[]) {
    if (users.length === 0) {
      this.notification.notify(
        "Vous n'êtes pas encore inscrit, veuillez vous inscrire",
        4000
      );

      return;
    }

    const user = users[0];

    this.activeUser$.next(user);

    this.updateUserLastLogin();
    localStorage.setItem('user', JSON.stringify(users[0]));
    localStorage.setItem('logged_in', new Date().toString());

    if (User.default_apps.includes(user.settings_default_app)) {
      this.router.navigate([user.settings_default_app]);
    } else {
      this.router.navigate([Link.FLOWS_INBOX]);
    }
  }

  logout() {
    this.activeUser$.next(null);
    localStorage.removeItem('user');

    this.notification.notify('Vous êtes déconnecté');
  }

  updateUserLastLogin() {
    if (!this._activeUser) {
      return;
    }
    const set = { last_login: new Date() };
    this.updateUser(this._activeUser.id, set).subscribe((data) =>
      console.log('updated last login', data)
    );
  }

  updateDefaultApp(default_app: string) {
    if (!this._activeUser) {
      return;
    }
    const set = { settings_default_app: default_app };
    this.updateUser(this._activeUser.id, set).subscribe((data) =>
      this.notification.notify('Application par Défaut Mise à jour')
    );
  }

  resetPassword(hashed: string) {
    if (!this._activeUser) {
      return;
    }

    const set = { hashed: hashed };
    this.updateUser(this._activeUser.id, set).subscribe((data) =>
      console.log(data)
    );
  }

  transfer(user_id: number, entity_id: number) {
    const set = { entity_id: entity_id, verified: false };
    this.updateUser(user_id, set).subscribe((data) =>
      console.log('transfered user', data)
    );
  }

  verifyUser(user_id: number) {
    const set = { verified: true };
    this.updateUser(user_id, set).subscribe((data) =>
      this.notification.notify('Utilisateur verifié')
    );
  }

  desactivateUser(user: User) {
    const set = { active: false };
    this.updateUser(user.id, set).subscribe((data) =>
      this.notification.notify('Utilisateur désactivé')
    );
  }

  updateUser(user_id: number, set: any = {}, inc: any = {}) {
    const UPDATE_USER_MUTATION = gql`
      mutation update_user_mutation(
        $user_id: Int!
        $_set: user_set_input = {}
        $_inc: user_inc_input = {}
      ) {
        update_user(
          where: { id: { _eq: $user_id } }
          _set: $_set
          _inc: $_inc
        ) {
          affected_rows
          returning {
            id
          }
        }
      }
    `;

    return this.apollo.mutate({
      mutation: UPDATE_USER_MUTATION,
      variables: {
        user_id: user_id,
        _set: set,
        _inc: inc,
      },
    });
  }

  saveActiveUserInCookies() {}

  getActiveUserFromCookies() {}
}
