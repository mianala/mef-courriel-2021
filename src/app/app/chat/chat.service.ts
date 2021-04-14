import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Entity } from 'src/app/classes/entity';
import { User } from 'src/app/classes/user';
import { EntityService } from '../entities/service/entity.service';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  entity: Entity = new Entity();
  user: User = new User();
  constructor(
    private entityService: EntityService,
    private userService: UserService,
    private apollo: Apollo
  ) {
    entityService.active_entity.subscribe((data) => (this.entity = data));
    userService.active_user.subscribe((data) => (this.user = data));
  }

  createConversation(conversation = { message: '', user_id: 0 }) {
    const CREATE_CONVERSATION = gql`
      mutation createConversation(
        $message: String = ""
        $user_id: Int
        $data: [participant_insert_input!] = { user_id: this.user.id }
      ) {
        insert_conversation(
          objects: {
            participants: { data: $data }
            messages: { data: { message: $message, user_id: $user_id } }
          }
        ) {
          returning {
            id
            messages {
              content
              user_id
            }
            participants {
              user_id
              user {
                id
                firstname
                lastname
              }
            }
          }
          affected_rows
        }
      }
      `
    const participants = [{ user_id: this.user.id }];
    // need to test the return of push
    conversation.user_id
      ? participants.push({ user_id: conversation.user_id })
      : participants;

    this.apollo
      .mutate({
        mutation: CREATE_CONVERSATION,
        variables: {
          user_id: this.user.id,
          message: conversation.message,
          participants: participants,
        },
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  reply(message = { conversation_id: '', content: '' }) {
    const REPLY_CONVERSATION = gql`
      mutation reply_to_conversation(
        $conversation_id: Int!
        $message: String!
        $user_id: Int!
      ) {
        insert_message(
          objects: {
            conversation_id: $conversation_id
            content: $message
            user_id: $user_id
          }
        ) {
          returning {
            id
            message
          }
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: REPLY_CONVERSATION,
        variables: {
          user_id: this.user.id,
          message: message.content,
          conversation_id: message.conversation_id,
        },
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  dismiss(id: number) {
    const DISMISS_MESSAGE = gql`
      mutation MyMutation($_eq: Int!) {
        update_message(
          where: { id: { _eq: $_eq } }
          _set: { dismissed: true }
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
        mutation: DISMISS_MESSAGE,
        variables: { id: id },
      })
      .subscribe((data) => console.log(data));
  }
}
