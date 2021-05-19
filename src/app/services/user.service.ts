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
import { AuthQueries } from '../queries/auth.queries';
import UserQueries from '../queries/user.queries';

class UserWithActions extends User {
  desactivate() {
    UserService.getInstance().desactivateUser(this.id);
  }

  activate() {
    UserService.getInstance().activateUser(this.id);
  }

  verify() {
    UserService.getInstance().verifyUser(this.id);
  }

  static mapActiveAndVerifiedUsers = map((users: UserWithActions[]) => {
    return users.filter((user) => user.active && user.verified);
  });

  static mapUnverifiedUsers = map((users: UserWithActions[]) => {
    return users.filter((user) => !user.verified && user.active);
  });

  static mapInactiveUsers = map((users: UserWithActions[]) => {
    return users.filter((user) => !user.active && user.verified);
  });

  static mapUsers = map((val: any): UserWithActions[] => {
    console.log(val);
    return val.data.user.map((val: any) => {
      return new UserWithActions(val);
    });
  });
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  static instance: UserService;

  static getInstance() {
    if (UserService.instance) {
      return UserService.instance;
    }

    return UserService.instance;
  }

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

  loggedIn$ = this.activeUser$.pipe(map((user) => (user ? true : false)));

  usersQuery = this.getUsers();
  unverifiedUsersQuery = this.getUnverifiedUsers();
  inactivatedUsersQuery = this.getInactiveUsers();
  activeAndVerifiedUsersQuery = this.getActiveAndVerifiedUsers();

  users$ = this.usersQuery.valueChanges.pipe(UserWithActions.mapUsers);
  // allUsers$ = this.usersQuery.valueChanges.pipe(UserWithActions.mapUsers);
  activeAndVerifiedUsers$ = this.activeAndVerifiedUsersQuery.valueChanges.pipe(
    UserWithActions.mapUsers
  );

  unverifiedUsers$ = this.unverifiedUsersQuery.valueChanges.pipe(
    UserWithActions.mapUsers
  );
  inactivatedUsers$ = this.inactivatedUsersQuery.valueChanges.pipe(
    UserWithActions.mapUsers
  );

  loggedOut$ = this.loggedIn$.pipe(
    distinctUntilChanged(),
    map((current) => !current)
  );

  constructor(
    private apollo: Apollo,
    private notification: NotificationService,
    private router: Router
  ) {
    if (!UserService.instance) {
      UserService.instance = this;
    }

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
    return this.apollo.mutate({
      mutation: UserQueries.SAVE_NEW,
      variables: variables,
    });
  }

  getUsers() {
    return this.apollo.watchQuery({
      query: UserQueries.USERS,
      fetchPolicy: 'cache-and-network',
    });
  }

  getAllUsers() {
    return this.apollo.watchQuery({
      query: UserQueries.USERS,
      fetchPolicy: 'cache-and-network',
    });
  }

  getUnverifiedUsers() {
    return this.apollo.watchQuery({
      query: UserQueries.UNVERIFIED,
      fetchPolicy: 'cache-and-network',
    });
  }

  getActiveAndVerifiedUsers() {
    return this.apollo.watchQuery({
      query: UserQueries.ACTIVE_AND_VERIFIED,
      fetchPolicy: 'cache-and-network',
    });
  }

  getInactiveUsers() {
    return this.apollo.watchQuery({
      query: UserQueries.INACTIVE,
      fetchPolicy: 'cache-and-network',
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
      .watchQuery({
        query: GET_ENTITY_USERS_QUERY,
        variables: {
          entity_id: entity_id,
          fetchPolicy: 'cache-and-network',
        },
      })
      .valueChanges.pipe(UserWithActions.mapUsers);
  }

  logIn(variables: { username: any; hashed: any }, next: () => void) {
    this.apollo
      .query({
        query: AuthQueries.LOGIN,
        variables: variables,
      })
      .pipe(UserWithActions.mapUsers)
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

  desactivateUser(user_id: number) {
    const set = { active: false };
    this.updateUser(user_id, set).subscribe((data) =>
      this.notification.notify('Utilisateur désactivé')
    );
  }

  activateUser(user_id: number) {
    const set = { active: true };
    this.updateUser(user_id, set).subscribe((data) =>
      this.notification.notify('Utilisateur activé')
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
      mutation: UserQueries.UPDATE,
      variables: {
        user_id: user_id,
        _set: set,
        _inc: inc,
      },
    });
  }
}
