import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {


  user: any;
  private subscription: any;
  room_id: string;
  room: any;
  room_idCame: boolean;


  new_message: string = "";
  messages: any[];

  constructor(private websocketService: WebsocketService, private router: Router, private route: ActivatedRoute, private chatService: ChatService) { }

  ngOnInit(): void {

    console.log('here');
    //get active route params
    this.subscription = this.route.params.subscribe(params => {
      this.room_id = params['id'];
      this.room_idCame = true;
      console.log(this.room_id)
      this.chatService.getOneChat(this.room_id).subscribe(
        res => {
          this.room = res
          console.log(res);

          //get logged user
          this.user = JSON.parse(localStorage.getItem('user_session'));

          //join room
          this.joinRoom(this.room_id);
        }
      )
    })




    this.websocketService.listen('message').subscribe((data) => {
      console.log(data);
      this.messages.push(data);

      var objDiv = document.getElementById("chat");
      objDiv.scrollTop = objDiv.scrollHeight + 80;
      console.log(objDiv.scrollHeight)

    })

    this.messages = [];

  }

  joinRoom(room_id: string) {
    let data = {};
    data["room"] = room_id;
    console.log(this.room.name);
    data["room_name"] = this.room.name;
    data["username"] = this.user.username;
    this.websocketService.emit('joinRoom', data)
  }

  sendMessage() {
    this.websocketService.emit('chatMessage', this.new_message);
  }

  leaveRoom() {
    this.websocketService.emit('disconnect', "");
    this.websocketService.disconnect();
    this.router.navigate(['/chat'])
  }

  setFinished() {
    let data = {};
    data["id"] = this.room_id;
    this.chatService.setFinished(data).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/chat'])
      }

    )
  }
}
