import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  message = '';
  room_id = 0;
  user_id = 0;
  constructor(private route: ActivatedRoute, private chatService: ChatService) {
    this.route.queryParams.subscribe((data) => {
      this.room_id = parseInt(data.room);
      this.user_id = parseInt(data.user);

      console.log('room', this.room_id, 'user', this.user_id);

      this.chatService.getRoomMessages();
    });
  }

  ngOnInit(): void {}
}
