import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [UserService]
})
export class WelcomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.sgnup_page2 = false;

    this.user = {} as User;

    this.signUpButton = document.getElementById("signUp");
    this.signInButton = document.getElementById("signIn");
    this.container = document.getElementById("container");

    this.signUpButton.addEventListener("click", () => {
      this.container.classList.add("right-panel-active");
    });

    this.signInButton.addEventListener("click", () => {
      this.container.classList.remove("right-panel-active");
    });

  }

  signUpButton: HTMLElement;
  signInButton: HTMLElement;
  container: HTMLElement;

  first_name: string;
  last_name: string;
  dob: Date;
  country: string;
  city: string;
  username: string;
  email: string;
  password: string;

  user: User;

  serverErrorMsg: string;
  successMsg: string;

  emptyField_pg1msg: string;
  emptyField_pg2msg: string;

  //signup screen page 2 flag
  sgnup_page2: boolean;


  signup() {

    //min 7 karaktera, slovo malo i veliko, broj, specijalan karakter
    let passwordRegex = RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])([a-z]|[A-Z]).{7,}$');


    if (!passwordRegex.test(this.password)) {
      this.emptyField_pg2msg = "Password must meet the criteria"
      return;
    }

    this.user.first_name = this.first_name;
    this.user.last_name = this.last_name;
    this.user.dob = this.dob;
    this.user.country = this.country;
    this.user.city = this.city;
    this.user.username = this.username;
    this.user.email = this.email;
    this.user.password = this.password;

    //calls service which can send a http post req
    this.userService.registerRequest(this.user).subscribe(
      res => {
        this.successMsg = "Success!"
        this.serverErrorMsg = ""
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMsg = "Email or username are already taken"
          this.successMsg = ""
        }
        else
          this.serverErrorMsg = 'Something went wrong.Please contact admin.';
      }
    );

  }

  goto_page2() {
    if (this.isEmpty(this.first_name) || this.isEmpty(this.last_name) || this.isEmpty(this.country) || this.isEmpty(this.city) || this.dob == null)
      this.emptyField_pg1msg = "All fields must be filled"

    else {
      this.sgnup_page2 = true;
      this.emptyField_pg1msg = "";
    }
  }

  reset_signup() {
    this.sgnup_page2 = false;
  }

  isEmpty(field: string): boolean {
    if (field == "" || field == null)
      return true;
    return false;
  }


}
