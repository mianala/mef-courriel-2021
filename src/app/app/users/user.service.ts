import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/classes/user';
import { NotificationService } from 'src/app/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {


  // save in cookie no sensitive data
  active_user: BehaviorSubject<User> = new BehaviorSubject(new User());

  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);


  constructor(private apollo: Apollo, private notification: NotificationService) {
    const user =
      localStorage.getItem('user') !== null
        ? JSON.parse(localStorage.getItem('user') || '[]')
        : null; // redirect to login

    this.active_user.next(user);
    // code for testing
    // this.logIn({username: 'myusername', hashed:'mypassword'});

    this.getUsers()
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

  logIn(variables: { username: any; hashed: any }) {
    const USER_LOGIN_QUERY = gql`
    query login($username: String!, $hashed: String!) {
      user(where: { username: { _eq: $username }, hashed: { _eq: $hashed } }) {
        id
        username
        firstname
        lastname
        title
        im
        entity_id
        profile_picture
        email
        rights
        phone
        settings_default_app
        settings_default_flow_page
        entity {
          id
          id_text
          long
          short
          numero
          sent_count
          received_count
          active
          short_header
          long_header
          labels
          level
          parent_entity_id
          sub_entities_count
        }
      }
    }
  `;
    this.apollo
      .query({
        query: USER_LOGIN_QUERY,
        variables: variables,
      })
      .subscribe(this.logInHandler.bind(this));
  }

  updateUserLastLogin() {
    const UPDATE_LAST_LOGIN_QUERY = gql`
      mutation update_user_last_login($user_id: Int!, $last_login: date = now) {
        update_user(where: {id: {_eq: $user_id}}, _set: {last_login: $last_login}) {
          affected_rows
          returning{
            id
          }
        }
      }
    `

    this.apollo.mutate({
      mutation: UPDATE_LAST_LOGIN_QUERY,
      variables: { user_id: this.active_user.value.id }
    }).subscribe(data => console.log(data))
  }

  getUsers() {
    const GET_USERS_QUERY = gql`
    query get_users {
      user {
        id
        lastname
        firstname
        email
        phone
        im
        title
        verified
        action_counter
        entity {
          short
          short_header
        }
      }
    }
  `;
    this.apollo.query({
      query: GET_USERS_QUERY,
    }).pipe(
      map((val: any) => {
        return val.data.user.map((val: any) => {
          return new User(val);
        });
      })
    ).subscribe(data => {
      this.users.next(data)
    })
  }

  logInHandler(data: any) {
    this.active_user.next(data.data.user[0]);
    this.updateUserLastLogin()
    localStorage.setItem('user', JSON.stringify(data.data.user[0]))
    localStorage.setItem('logged_in', new Date().toString())
  }

  resetPassword(hashed: string) {
    const RESET_USER_PASSWORD = gql`
      mutation update_user_reset_password($user_id: Int!, $hashed: String!) {
        update_user(where: {id: {_eq: $user_id}}, _set: {hashed: $hashed}) {
          affected_rows
          returning{
            id
          }
        }
      }
    `

    this.apollo.mutate({
      mutation: RESET_USER_PASSWORD,
      variables: { user_id: this.active_user.value.id, hashed: hashed }
    }).subscribe(data => console.log(data))
  }

  transfer(user_id: number, entity_id: number) {
    const TRANSFER_USER_MUTATION = gql`
      mutation transfer_user($user_id: Int!, $entity_id: Int!) {
        update_user(where: {id: {_eq: $user_id}}, _set: {
          entity_id: $entity_id 
          verified:false
          }) {
          affected_rows
        }
      }
    `

    this.apollo.mutate({
      mutation: TRANSFER_USER_MUTATION,
      variables: { user_id: user_id, entity_id: entity_id }
    }).subscribe(data => console.log(data))
  }

  verifyUser(user_id: number) {
    const VERIFY_USER_MUTATION = gql`
      mutation transfer_user($user_id: Int!) {
        update_user(where: {id: {_eq: $user_id}}, _set: {verified: true}) {
          affected_rows
        }
      }
    `

    this.apollo.mutate({
      mutation: VERIFY_USER_MUTATION,
      variables: { user_id: user_id }
    }).subscribe(data => this.notification.open('Utilisateur verifié'))
  }

  desactivateUser(user: User) {
    const DESACTIVATE_USER_MUTATION = gql`
      mutation desactivate_user($id: Int!) {
        update_user(where: {id: {_eq: $id}}, _set: {active: false}) {
          affected_rows
          returning{
            id
          }
        }
      }
    `

    this.apollo.mutate({
      mutation: DESACTIVATE_USER_MUTATION,
      variables: { id: user.id }
    }).subscribe(data => this.notification.open("Utilisateur désactivé"))
  }

  updateUserInfo(user: any) {
    const UDPATE_USER_INFO = gql`
      mutation update_user($user_id: Int!, $firstname: String!,$last: String!, $title: String!) {
        update_user(where: {id: {_eq: $user_id}}, _set: {
            firstname: $firstname
            lastname: $lastname
            title: $title
          }) {
          affected_rows
          returning{
            id
          }
        }
      }
    `

    this.apollo.mutate({
      mutation: UDPATE_USER_INFO,
      variables: { user_id: this.active_user.value.id, firstname: user.firstname, last: user.last, title: user.title }
    }).subscribe(data => console.log(data))
  }

  saveActiveUserInCookies() { }

  getActiveUserFromCookies() { }

}
