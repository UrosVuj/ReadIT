import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {

  user: User;
  users: [];
  no_users: boolean;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user_session'));
    this.user.avatar_path = "http://localhost:3000/" + this.user.avatar_path.substr(7);

    this.getUnapproved();

  }

  approveUser(username: string, i: number) {


    this.users.splice(i, 1);
    let data = {};
    data["username"] = username;
    this.adminService.approveUser(data).subscribe(
      res => {
        console.log(res);
      }
    )
  }

  rejectUser(username: string, i: number) {


    this.users.splice(i, 1);
    let data = {};
    data["username"] = username;
    this.adminService.rejectUser(data).subscribe(
      res => {
        console.log(res.msg);
      }
    )
  }

  getUnapproved() {
    this.adminService.getUnapprovedUsers().subscribe(
      res => {
        this.users = res;
        if (this.users.length < 0)
          this.no_users = true;
        else
          this.no_users = false;
      }
    )
  }

  generateBirthday(user: any): string {
    var real_month: string;
    var real_day: string;

    let date = new Date(user.dob)
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
    return real_day + "/" + real_month + "/" + year
  }

}
