import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../services/user.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { BookService } from '../../services/book.service';
import { ifError } from 'assert';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [UserService]
})
export class WelcomeComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private storageService: StorageService,
    private bookService: BookService
  ) { }

  ngOnInit(): void {

    localStorage.clear();

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

  login_username: string;
  login_password: string;

  first_name: string;
  last_name: string;
  dob: Date;
  country: string;
  city: string;
  username: string;
  email: string;
  password: string;
  avatar: File;

  user: User;

  serverErrorMsg: string;
  successMsg: string;

  emptyField_pg1msg: string;
  emptyField_pg2msg: string;
  signIn_msg: string;

  //signup screen page 2 flag
  sgnup_page2: boolean;


  signIn() {

    this.userService.loginRequest({ username: this.login_username, password: this.login_password }).subscribe(
      res => {

        console.log(res)

        if (res.found == true) {
          this.storageService.setItem('user_session', JSON.stringify(res.info));
          console.log(JSON.stringify(res.info))
          this.router.navigate(['/profile'])
        }
        else {
          this.signIn_msg = "No such account"
        }
      },
      err => {
        console.log("NAY")
      }
    )


  }

  signup() {

    //min 7 karaktera, slovo malo i veliko, broj, specijalan karakter
    let passwordRegex = RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])([a-z]|[A-Z]).{6,}$');


    if (!passwordRegex.test(this.password)) {
      this.emptyField_pg2msg = "Password isn't strong enough!"
      return;
    }


    let form = new FormData();
    form.append('avatar', this.avatar);
    form.append('first_name', this.first_name);
    form.append('last_name', this.last_name);
    form.append('dob', this.dob.toString());
    form.append('country', this.country);
    form.append('city', this.city);
    form.append('username', this.username);
    form.append('email', this.email);
    form.append('password', this.password);

    //calls service which can send a http post req
    this.userService.registerRequest(form).subscribe(
      res => {
        if (res.msg == "Success!") {
          this.successMsg = "Success!"
          this.serverErrorMsg = ""

          let my_data = {};
          my_data["username"] = this.username;

          this.bookService.createList(my_data).subscribe(
            res => {
              console.log(res);
              console.log("List created")
            }
          )
        }
        else this.serverErrorMsg = res.msg
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMsg = "Email or username are already taken"
          this.successMsg = ""
        }
        else
          this.serverErrorMsg = 'Something went wrong. Please contact admin.';
        console.log(err.status)
      }
    );

  }

  upload_img(event) {
    if (event.target.files.length > 0)
      this.avatar = event.target.files[0];
  }

  //used by the "Next" button in the signup container
  goto_page2() {

    if (this.isEmpty(this.first_name) || this.isEmpty(this.last_name) || this.isEmpty(this.country) || this.isEmpty(this.city) || this.dob == null)
      this.emptyField_pg1msg = "All fields must be filled"

    else {
      this.sgnup_page2 = true;
      this.emptyField_pg1msg = "";
    }
  }

  //when trying to login, resets the signup container to page 1
  reset_signup() {
    this.sgnup_page2 = false;
  }

  isEmpty(field: string): boolean {
    if (field == "" || field == null)
      return true;
    return false;
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  goGuest() {
    let guest = {} as User;
    guest.first_name = "Guest";
    guest.last_name = "Guest";
    guest.username = "Guest";
    guest.avatar_path = "images/default_avatar.jpg"
    this.storageService.setItem('user_session', JSON.stringify(guest))
    this.router.navigate(['/search'])
  }


}
