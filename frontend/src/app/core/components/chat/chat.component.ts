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

  chats: any[];
  chats_came: boolean;
  user: any;

  //add event button flag
  addChat_flag: boolean;
  page2_flag: boolean;

  //add event form parameters
  name: string;
  description: string;
  private: boolean;
  start: Date;
  now: Date;



  constructor(private router: Router, private chatService: ChatService) { }

  ngOnInit(): void {

    this.page2_flag = false;

    this.now = new Date();
    this.addChat_flag = false;
    this.user = JSON.parse(localStorage.getItem('user_session'));


    this.chatService.getAllChats().subscribe(
      res => {
        this.chats = res;
        this.chats_came = true;



        for (let i = 0; i < this.chats.length; i++)
          if (new Date(this.chats[i].start) < this.now && this.chats[i].finished == true)
            this.chats.splice(i, 1);


        this.chats.forEach(chat => {
          chat['fake_start'] = this.generateTime(chat);
        });
      }
    )

  }

  checkStart(chat: any): boolean {
    let now = new Date();

    console.log(now);
    console.log(new Date(chat.start))

    if (now >= new Date(chat.start))
      return true;
    else return false;
  }


  goto_room(room_id: string) {

    this.router.navigate(['/chat-room/' + room_id]);
  }

  addChat() {
    this.addChat_flag = true;
  }
  generateTime(chat: any): string {
    var real_month: string;
    var real_day: string;

    let date = new Date(chat.start)
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();



    real_month = month + "";
    real_day = day + "";

    if (month < 10) {
      real_month = "0" + real_month;
    }
    if (day < 10) {
      real_day = "0" + real_day
    }
    return real_day + "/" + real_month + "/" + year + "  " + hours + ":" + minutes;
  }

  checkAccess(room: any): boolean {
    for (let i = 0; i < room.users.length; i++) {

      if (this.user.username == room.users[i]) {
        return true;
      }
    }
    return false;
  }

  page2() {
    this.page2_flag = true;
  }

  submitNewRoom() {
    let data = {};
    data["name"] = this.name;
    data["creator"] = this.user.username;
    data["description"] = this.description;
    if (this.user.type == 'user')
      data['private'] = 'true'
    else
      data['private'] = this.private;
    data['start'] = this.start;
    data['finished'] = false;

    this.chatService.addChat(data).subscribe(
      res => {
        console.log(res);
      }
    )
  }

}
