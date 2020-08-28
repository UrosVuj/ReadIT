import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  rooms: any;
  user: any;

  constructor(private router: Router) { }

  ngOnInit(): void {


    this.user = JSON.parse(localStorage.getItem('user_session'));

  }


  goto_room(room_name: string) {
    this.rooms.forEach(room => {
      if (room.name == room_name)
        this.router.navigate(['/chat-room/' + room.id])
    });
  }

}
