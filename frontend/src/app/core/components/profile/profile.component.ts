import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { User } from 'src/app/models/user';
import { BookService } from '../../services/book.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  want_to_read: any;
  finished_reading: any;
  currently_reading: any;

  want_to_read_flag: boolean;
  finished_reading_flag: boolean;
  currently_reading_flag: boolean;

  birthday: string;

  constructor(private router: Router, private storageService: StorageService, private bookService: BookService) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user_session'));

    this.user.avatar_path = "http://localhost:3000/" + this.user.avatar_path.substr(7);

    this.setReadingLists();
    this.generateBirthday();

    console.log("Nice!")
  }

  user: User;



  goto_book(id: string) {
    this.router.navigate(['/book/' + id])
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

  /*
  Start of book list functions
  */

  setReadingLists() {
    console.log("Nice!")
    this.bookService.getReadingLists(this.user.username).subscribe(
      res => {
        console.log("Nice2!")
        this.want_to_read = res.want_to_read;
        this.finished_reading = res.finished_reading;
        this.currently_reading = res.currently_reading;

        console.log(this.finished_reading)
        console.log("Nice!")

      },
      err => {
        console.log("NAY")
      }
    )
  }

  setFutureRead() {

    this.currently_reading_flag = false;
    this.finished_reading_flag = false;
    this.want_to_read_flag = true;

    console.log(this.want_to_read)
    this.showFutureReadBooks();
  }

  showFutureReadBooks() {
    this.want_to_read.forEach(book => {
      book.cover_path = "http://localhost:3000/" + book.cover_path.substr(7);
      console.log(book.cover_path.substr(7))
    });

    //test
    this.want_to_read = this.want_to_read.reduce((acc, col, i) => {
      if (i % 4 == 0) {
        acc.push({ column1: col });
      } else {
        if (i % 4 == 1) {
          acc[acc.length - 1].column2 = col;
        }
        else if (i % 4 == 2) {
          acc[acc.length - 1].column3 = col
        }
        else acc[acc.length - 1].column4 = col;
      }
      return acc;
    }, []);


    console.log(this.want_to_read)

  }

  setCurrRead() {

    this.currently_reading_flag = true;
    this.finished_reading_flag = false;
    this.want_to_read_flag = false;

    console.log(this.currently_reading);
    this.showCurrReadBooks();
  }

  showCurrReadBooks() {
    this.currently_reading.forEach(book => {
      book.cover_path = "http://localhost:3000/" + book.cover_path.substr(7);
      console.log(book.cover_path.substr(7))
    });

    //test
    this.currently_reading = this.currently_reading.reduce((acc, col, i) => {
      if (i % 4 == 0) {
        acc.push({ column1: col });
      } else {
        if (i % 4 == 1) {
          acc[acc.length - 1].column2 = col;
        }
        else if (i % 4 == 2) {
          acc[acc.length - 1].column3 = col
        }
        else acc[acc.length - 1].column4 = col;
      }
      return acc;
    }, []);


    console.log(this.currently_reading)

  }

  setFinishedBooks() {
    this.finished_reading_flag = true;
    this.currently_reading_flag = false;
    this.want_to_read_flag = false;

    console.log(this.finished_reading);
    this.showFinishedBooks();
  }

  showFinishedBooks() {
    this.finished_reading.forEach(book => {
      book.cover_path = "http://localhost:3000/" + book.cover_path.substr(7);
      console.log(book.cover_path.substr(7))
    });

    //test
    this.finished_reading = this.finished_reading.reduce((acc, col, i) => {
      if (i % 4 == 0) {
        acc.push({ column1: col });
      } else {
        if (i % 4 == 1) {
          acc[acc.length - 1].column2 = col;
        }
        else if (i % 4 == 2) {
          acc[acc.length - 1].column3 = col
        }
        else acc[acc.length - 1].column4 = col;
      }
      return acc;
    }, []);


    console.log(this.finished_reading)

  }


}
