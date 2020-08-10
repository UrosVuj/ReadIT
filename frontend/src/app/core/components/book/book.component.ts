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
  books_flag: boolean;
  book_came: boolean;
  user: User;

  authors: string;
  genres: string;
  list_type: string;

  my_comment_text: string;
  my_rating: number;

  all_comments: any;
  gotComments_flag: boolean;

  already_reviewed: boolean;



  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit() {
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
      }
    )
  }

  getComments() {
    this.bookService.getComments(this.id).subscribe(
      res => {
        this.all_comments = res;
        this.gotComments_flag = true;
        if (this.all_comments.length > 0)
          this.real_rating = this.book.avg_score / this.all_comments.length;
        else this.real_rating = -1;

        this.all_comments.forEach(comment => {
          if (this.user.username == comment.username)
            this.already_reviewed = true;
        });
        console.log(this.all_comments);
      }
    )
  }

}
