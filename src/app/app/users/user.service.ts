import { Injectable } from '@angular/core';
import { _MatTabGroupBase } from '@angular/material/tabs';
import { NavigationEnd, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { Entity } from 'src/app/classes/entity';
import { User } from 'src/app/classes/user';
import { NotificationService } from 'src/app/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // save in cookie no sensitive data
  active_user: BehaviorSubject<User> = new BehaviorSubject(new User());

  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  logged_in: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private apollo: Apollo,
    private notification: NotificationService,
    private router: Router
  ) {
    const user =
      localStorage.getItem('user') !== null
        ? JSON.parse(localStorage.getItem('user') || '[]')
        : null; // redirect to login

    const users =
      localStorage.getItem('users') !== null
        ? JSON.parse(localStorage.getItem('users') || '[]')
        : null; // redirect to login

    if (user !== null) {
      this.active_user.next(new User(user));
    }
    if (users !== null) {
      this.users.next(users);
    }

    //redirect upon entering the page first and not on refresh
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .pipe(first())
      .subscribe((event) => {
        if (event.id === 1 && event.url === event.urlAfterRedirects) {
          console.log('refreshed');
        } else {
          console.log('navigation initiated');
          if (user && ['/search'].includes(user.settings_default_app)) {
            this.router.navigate([user.settings_default_app]);
          }
        }
      });

    this.active_user.subscribe((user) => this.logged_in.next(user.id > 0));

    if (users === null) {
      this.getUsers();
    }
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
      .pipe(
        map((val: any) => {
          return val.data.user.map((val: any) => {
            return new User(val);
          });
        })
      );
  }

  logIn(variables: { username: any; hashed: any }, next: () => void) {
    const USER_LOGIN_QUERY = gql`
      ${User.core_user_fields}
      ${Entity.core_entity_fields}
      query login($username: String!, $hashed: String!) {
        user(
          where: { username: { _eq: $username }, hashed: { _eq: $hashed } }
        ) {
          ...CoreUserFields
          email
          rights
          phone
          settings_default_app
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
      .pipe(
        map((val: any) => {
          return val.data.user.map((val: any) => {
            return new User(val);
          });
        })
      )
      .subscribe((users) => {
        this.logInHandler(users);
        next();
      });
  }

  logInHandler(users: User[]) {
    if (users.length === 0) {
      this.notification.open(
        "Vous n'êtes pas encore inscrit, veuillez vous inscrire",
        4000
      );
      return;
    }

    const user = users[0];

    console.log(user);

    if (User.default_apps.includes(user.settings_default_app)) {
      this.router.navigate([user.settings_default_app]);
    } else {
      this.router.navigate(['/app/flow']);
    }

    this.active_user.next(user);

    this.updateUserLastLogin();
    localStorage.setItem('user', JSON.stringify(users[0]));
    localStorage.setItem('logged_in', new Date().toString());
  }

  logout() {
    this.active_user.next(new User());
    localStorage.removeItem('user');
    localStorage.removeItem('active_entity');

    this.notification.open('Vous êtes déconnecté');
  }

  updateUserLastLogin() {
    const UPDATE_LAST_LOGIN_QUERY = gql`
      mutation update_user_last_login($user_id: Int!, $last_login: date = now) {
        update_user(
          where: { id: { _eq: $user_id } }
          _set: { last_login: $last_login }
        ) {
          affected_rows
          returning {
            id
          }
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: UPDATE_LAST_LOGIN_QUERY,
        variables: { user_id: this.active_user.value.id },
      })
      .subscribe((data) => console.log('updated last login', data));
  }

  updateDefaultApp(default_app: string) {
    const UPDATE_USER_DEFAULT_APP = gql`
      mutation update_user_last_login(
        $user_id: Int!
        $settings_default_app: String!
      ) {
        update_user(
          where: { id: { _eq: $user_id } }
          _set: { settings_default_app: $settings_default_app }
        ) {
          affected_rows
          returning {
            id
          }
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: UPDATE_USER_DEFAULT_APP,
        variables: {
          user_id: this.active_user.value.id,
          settings_default_app: default_app,
        },
      })
      .subscribe((data) =>
        this.notification.open('Application par Défaut Mise à jour')
      );
  }

  getUsers() {
    const GET_USERS_QUERY = gql`
      ${User.core_user_fields}
      ${Entity.core_entity_fields}
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
    this.apollo
      .query({
        query: GET_USERS_QUERY,
      })
      .pipe(
        map((val: any) => {
          return val.data.user.map((val: any) => {
            return new User(val);
          });
        })
      )
      .subscribe((data) => {
        this.users.next(data);
        localStorage.setItem('users', JSON.stringify(data));
      });
  }

  resetPassword(hashed: string) {
    const RESET_USER_PASSWORD = gql`
      mutation update_user_reset_password($user_id: Int!, $hashed: String!) {
        update_user(
          where: { id: { _eq: $user_id } }
          _set: { hashed: $hashed }
        ) {
          affected_rows
          returning {
            id
          }
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: RESET_USER_PASSWORD,
        variables: { user_id: this.active_user.value.id, hashed: hashed },
      })
      .subscribe((data) => console.log(data));
  }

  transfer(user_id: number, entity_id: number) {
    const TRANSFER_USER_MUTATION = gql`
      mutation transfer_user($user_id: Int!, $entity_id: Int!) {
        update_user(
          where: { id: { _eq: $user_id } }
          _set: { entity_id: $entity_id, verified: false }
        ) {
          affected_rows
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: TRANSFER_USER_MUTATION,
        variables: { user_id: user_id, entity_id: entity_id },
      })
      .subscribe((data) => console.log(data));
  }

  verifyUser(user_id: number) {
    const VERIFY_USER_MUTATION = gql`
      mutation transfer_user($user_id: Int!) {
        update_user(
          where: { id: { _eq: $user_id } }
          _set: { verified: true }
        ) {
          affected_rows
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: VERIFY_USER_MUTATION,
        variables: { user_id: user_id },
      })
      .subscribe((data) => this.notification.open('Utilisateur verifié'));
  }

  desactivateUser(user: User) {
    const DESACTIVATE_USER_MUTATION = gql`
      mutation desactivate_user($id: Int!) {
        update_user(where: { id: { _eq: $id } }, _set: { active: false }) {
          affected_rows
          returning {
            id
          }
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: DESACTIVATE_USER_MUTATION,
        variables: { id: user.id },
      })
      .subscribe((data) => this.notification.open('Utilisateur désactivé'));
  }

  updateUserInfo(user: any) {
    const UDPATE_USER_INFO = gql`
      mutation update_user(
        $user_id: Int!
        $firstname: String!
        $last: String!
        $title: String!
      ) {
        update_user(
          where: { id: { _eq: $user_id } }
          _set: { firstname: $firstname, lastname: $lastname, title: $title }
        ) {
          affected_rows
          returning {
            id
          }
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: UDPATE_USER_INFO,
        variables: {
          user_id: this.active_user.value.id,
          firstname: user.firstname,
          last: user.last,
          title: user.title,
        },
      })
      .subscribe((data) => console.log(data));
  }

  saveActiveUserInCookies() {}

  getActiveUserFromCookies() {}
}
