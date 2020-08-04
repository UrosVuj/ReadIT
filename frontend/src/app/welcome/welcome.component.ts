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

  //signup screen page 2 flag
  sgnup_page2: boolean;


  signup() {


    this.user.first_name = this.first_name;
    this.user.last_name = this.last_name;
    this.user.dob = this.dob;
    this.user.country = this.country;
    this.user.city = this.city;
    this.user.username = this.username;
    this.user.email = this.email;
    this.user.password = this.password;

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

  isEmpty(field: string): boolean {
    if (field == "" || field == null)
      return true;
    return false;
  }


  page2() {
    if (this.isEmpty(this.first_name) || this.isEmpty(this.last_name) || this.isEmpty(this.country) || this.isEmpty(this.city) || this.dob == null)
      this.serverErrorMsg = "All fields must be fileld"

    else
      this.sgnup_page2 = true;
  }

  reset_signup() {
    this.sgnup_page2 = false;
  }


}
