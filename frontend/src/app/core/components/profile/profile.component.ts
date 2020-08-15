import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { User } from 'src/app/models/user';
import { BookService } from '../../services/book.service';
import { Book } from 'src/app/models/book';
import { UserService } from '../../services/user.service';
import { GoogleChartsModule } from 'angular-google-charts'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  want_to_read: any;
  finished_reading: any;
  currently_reading: any;

  want_to_read_reduced: any;
  finished_reading_reduced: any;
  currently_reading_reduced: any;

  want_to_read_flag: boolean;
  finished_reading_flag: boolean;
  currently_reading_flag: boolean;

  gotComments_flag: boolean;

  my_comments: any;

  birthday: string;
  user: User;



  //charts:

  title = "Book genre distribution for books you've finished";
  type = 'PieChart';
  data = [
    ['Firefox', 45.0],
    ['IE', 26.8],
    ['Chrome', 12.8],
    ['Safari', 8.5],
    ['Opera', 6.2],
    ['Others', 0.7]
  ];
  chart_data: any[];
  columnNames = ['Genre', 'Percentage'];
  options = {
    backgroundColor: 'rgb(95, 95, 95)',
    is3D: true
  };
  width = 550;
  height = 400;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private bookService: BookService,
    private userService: UserService) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user_session'));

    this.user.avatar_path = "http://localhost:3000/" + this.user.avatar_path.substr(7);

    this.chart_data = [];

    this.setReadingLists();
    this.generateBirthday();

    console.log("Nice!")
    this.getComments();
  }





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

    this.bookService.getReadingLists(this.user.username).subscribe(
      res => {

        this.want_to_read = res.want_to_read;
        this.finished_reading = res.finished_reading;
        this.currently_reading = res.currently_reading;

        //parse data from lists to chart data
        this.generatePieChart()

        this.want_to_read.forEach(book => {
          book.cover_path = "http://localhost:3000/" + book.cover_path.substr(7);
          console.log(book.cover_path.substr(7))
        });
        this.finished_reading.forEach(book => {
          book.cover_path = "http://localhost:3000/" + book.cover_path.substr(7);
          console.log(book.cover_path.substr(7))
        });
        this.currently_reading.forEach(book => {
          book.cover_path = "http://localhost:3000/" + book.cover_path.substr(7);
          console.log(book.cover_path.substr(7))
        });
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


    //test
    this.want_to_read_reduced = this.want_to_read.reduce((acc, col, i) => {
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


    //test
    this.currently_reading_reduced = this.currently_reading.reduce((acc, col, i) => {
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

    //test
    this.finished_reading_reduced = this.finished_reading.reduce((acc, col, i) => {
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

  }

  getComments() {

    console.log(this.user.username)
    this.userService.getComments(this.user.username).subscribe(
      res => {
        this.my_comments = res;
        this.gotComments_flag = true;
        console.log(res);
      }
    )
  }

  generatePieChart() {

    //get books with all object ids from finished_reading from server and get their genres
    // in a google chart
    let chart_data = {};

    this.finished_reading.forEach(book => {
      book.genres.forEach(genre => {
        if (chart_data[genre] == null)
          chart_data[genre] = 1;
        else
          chart_data[genre]++;
      });
    });

    Object.keys(chart_data).forEach(key => {
      let new_field = [key, chart_data[key]];
      this.chart_data.push(new_field);
    })
    console.log(chart_data)
  }


}
