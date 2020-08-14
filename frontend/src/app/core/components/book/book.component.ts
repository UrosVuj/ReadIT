import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from '../../services/book.service';
import { User } from 'src/app/models/user';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {

  id: string;
  private subscription: any;

  book: Book;
  real_rating: number;
  date_of_publishing: string;

  books_flag: boolean;
  book_came: boolean;
  user: User;

  authors: string;
  genres: string;
  list_type: string;

  //this users comment
  my_comment_text: string;
  my_rating: number;

  //getting comments from backend
  all_comments: any;
  gotComments_flag: boolean;

  already_reviewed: boolean;

  //user reading lists
  want_to_read: any;
  finished_reading: any;
  currently_reading: any;

  //changing book info
  change_flag: number;
  new_name: string;
  new_authors: string;
  new_authors_arr: string[];
  new_description: string;
  new_genres: string;
  new_genres_arr: string[];
  new_pub_date: Date;



  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit() {
    this.change_flag = 0;

    this.book = {} as Book;
    this.authors = "";
    this.genres = "";
    this.already_reviewed = false;

    //user init
    this.user = JSON.parse(localStorage.getItem('user_session'));
    this.user.avatar_path = "http://localhost:3000/" + this.user.avatar_path.substr(7);

    //get book
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.bookService.getBook(this.id).subscribe(
        res => {
          this.book = res;
          for (let i = 0; i < this.book.authors.length; i++) {
            if (i == this.book.authors.length - 1)
              this.authors = this.authors + this.book.authors[i];
            else this.authors = this.authors + this.book.authors[i] + ", ";
          }
          for (let i = 0; i < this.book.genres.length; i++) {
            if (i == this.book.genres.length - 1)
              this.genres = this.genres + this.book.genres[i];
            else this.genres = this.genres + this.book.genres[i] + ", ";
          }
          this.book.cover_path = "http://localhost:3000/" + this.book.cover_path.substr(7);
          this.book_came = true;
          this.generatePublishingDate();
          this.getComments();
        }
      )
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  books() {
    this.books_flag = true;
  }

  addToList() {
    let data = {};
    data["username"] = this.user.username;
    data["book_id"] = this.id;

    this.bookService.addBookToList(data, this.list_type).subscribe(
      res => {
        console.log(res);
      }
    )
  }

  addComment() {
    let data = {};
    console.log(this.my_comment_text);
    data["username"] = this.user.username;
    data["book_id"] = this.id;
    data["comment"] = this.my_comment_text;
    data["rating"] = this.my_rating;
    data["avg_score"] = this.book.avg_score + this.my_rating;

    this.bookService.addComment(data).subscribe(
      res => {
        console.log("Success")
        this.already_reviewed = true;
        this.getComments();
        //ako knjiga nema review-ova, rating novi ce joj biti samo ovaj
        if (this.all_comments.length == 0)
          this.real_rating = this.my_rating;
      }
    )
  }

  getComments() {
    this.bookService.getComments(this.id).subscribe(
      res => {
        this.all_comments = res;
        this.gotComments_flag = true;

        console.log(this.all_comments.length)
        console.log(this.book.avg_score)
        if (this.all_comments.length > 0)
          this.real_rating = this.book.avg_score / this.all_comments.length;
        else this.real_rating = 0
        if (this.my_rating && this.all_comments.length == 0)
          this.real_rating = this.my_rating;

        this.all_comments.forEach(comment => {
          if (this.user.username == comment.username)
            this.already_reviewed = true;
        });
        console.log(this.all_comments);
      }
    )
  }

  generatePublishingDate() {
    var real_month: string;
    var real_day: string;

    let date = new Date(this.book.date_of_publishing)
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
    this.date_of_publishing = real_day + "/" + real_month + "/" + year
  }

  setReadingLists() {

    this.bookService.getReadingLists(this.user.username).subscribe(
      res => {

        this.want_to_read = res.want_to_read;
        this.finished_reading = res.finished_reading;
        this.currently_reading = res.currently_reading;

      },
      err => {
        console.log("NAY")
      }
    )
  }

  //book modifying starts here for admin

  changeName() {
    this.change_flag = 1;
  }

  changeAuthors() {
    this.change_flag = 2;
  }

  changeDescription() {
    this.change_flag = 3;
  }

  changeGenres() {
    this.change_flag = 4;
  }

  changePublishingDate() {
    this.change_flag = 5;
  }

  submitChange(type: string) {
    this.change_flag = 0;

    console.log(type)
    console.log(this.new_description)
    let data = {};
    data["_id"] = this.id;
    data["type_to_update"] = type;


    switch (type) {
      case ("name"):
        data[type] = this.new_name;
        this.book.name = this.new_name;
        break;
      case ("authors"):
        this.new_authors_arr = this.new_authors.split(', ');
        data[type] = this.new_authors_arr;
        this.book.authors = this.new_authors_arr;
        break;
      case ("description"):
        data[type] = this.new_description;
        this.book.description = this.new_description;
        break;
      case ("genres"):
        this.new_genres_arr = this.new_genres.split(', ');
        data[type] = this.new_genres_arr;
        this.book.genres = this.new_genres_arr;
        break;
      case ("date_of_publishing"):
        data[type] = this.new_pub_date;
        this.book.date_of_publishing = this.new_pub_date;
        this.generatePublishingDate();
        break;
    }


    this.bookService.updateBook(data).subscribe(
      res => {
        console.log(res)
      }
    )
  }



}
