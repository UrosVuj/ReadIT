import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-privileges',
  templateUrl: './add-privileges.component.html',
  styleUrls: ['./add-privileges.component.css']
})
export class AddPrivilegesComponent implements OnInit {

  users: any[];
  constructor(private userService: UserService, private adminService: AdminService) { }

  ngOnInit(): void {

    this.userService.getUsers().subscribe(
      res => {
        this.users = res;
        this.users.forEach(user => {
          user.avatar_path = user.avatar_path.substr(7);
        })
      }
    )
  }


  setType(type: string, user: any) {

    user.type = type;

    let data = {};
    data["username"] = user.username;
    data["type"] = type;
    this.adminService.setPrivileges(data).subscribe(
      res => {
        console.log(res.msg);
      }
    )
  }
}
