import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  SAVE_NEW_USER_MUTATION = gql`
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

  // save in cookie no sensitive data
  active_user: BehaviorSubject<User> = new BehaviorSubject(new User());

  USER_LOGIN_QUERY = gql`
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

  saveNewUser(variables: any) {
    return this.apollo.mutate({
      mutation: this.SAVE_NEW_USER_MUTATION,
      variables: variables,
    });
  }

  logIn(variables: { username: any; hashed: any }) {
    this.apollo
      .query({
        query: this.USER_LOGIN_QUERY,
        variables: variables,
      })
      .subscribe(this.logInHandler.bind(this));
  }

  logInHandler(data: any) {
    this.receivedUser(data.data.user[0]);
    localStorage.setItem('user', JSON.stringify(data.data.user[0]));
    localStorage.setItem('logged_in', new Date().toString());
  }

  receivedUser(user: User) {
    this.active_user.next(user);
  }

  saveActiveUserInCookies() {}

  getActiveUserFromCookies() {}

  constructor(private apollo: Apollo) {
    const user =
      localStorage.getItem('user') !== null
        ? JSON.parse(localStorage.getItem('user') || '[]')
        : null; // redirect to login

    this.active_user.next(user)
    // code for testing
    // this.logIn({username: 'myusername', hashed:'mypassword'});
  }
}
