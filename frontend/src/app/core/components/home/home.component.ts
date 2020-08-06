import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user_session'));
    this.user.avatar_path = "http://localhost:3000/" + this.user.avatar_path.substr(7);
    console.log(this.user.avatar_path)

  }

  user: User;

}
