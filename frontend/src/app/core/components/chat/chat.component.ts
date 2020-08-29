import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chats: any;
  chats_came: boolean;
  user: any;

  constructor(private router: Router, private chatService: ChatService) { }

  ngOnInit(): void {


    this.user = JSON.parse(localStorage.getItem('user_session'));

    this.chatService.getAllChats().subscribe(
      res => {
        this.chats = res;
        this.chats_came = true;
      }
    )

  }


  goto_room(room_id: string) {

    this.router.navigate(['/chat-room/' + room_id]);
  }

}
