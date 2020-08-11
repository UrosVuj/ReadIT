import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  birthday: string;
  user: User;

  change_flag: number;

  first_name: string;
  last_name: string;
  email: string;
  dob: Date;
  country: string;
  city: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user_session'));
    this.generateBirthday();
  }

  generateBirthday() {
    var real_month: string;
    var real_day: string;

    let date = new Date(this.user.dob)
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    real_month = month + "";
    real_day = day + "";

    if (month < 10) {
      real_month = "0" + real_month;
    }
    if (day < 10) {
      real_day = "0" + real_day
    }
    this.birthday = real_day + "/" + real_month + "/" + year
  }

  changeField(flag: number) {
    this.change_flag = flag;
  }

  submitChange(type: string) {
    this.change_flag = 9;

    let data = {};
    data["username"] = this.user.username;
    data["type_to_update"] = type;

    switch (type) {
      case ("first_name"):
        data[type] = this.first_name;
        this.user.first_name = this.first_name;
        localStorage.setItem('user_session', JSON.stringify(this.user))
        break;
      case ("last_name"):
        data[type] = this.last_name;
        this.user.last_name = this.last_name;
        localStorage.setItem('user_session', JSON.stringify(this.user))
        break;
      case ("email"):
        data[type] = this.email;
        this.user.email = this.email;
        localStorage.setItem('user_session', JSON.stringify(this.user))
        break;
      case ("country"):
        data[type] = this.country;
        this.user.country = this.country;
        localStorage.setItem('user_session', JSON.stringify(this.user))
        break;
      case ("city"):
        data[type] = this.city;
        this.user.city = this.city;
        localStorage.setItem('user_session', JSON.stringify(this.user))
        break;
    }


    this.userService.updateProfile(data).subscribe(
      res => {
        console.log(res)
      }
    )
  }

}
