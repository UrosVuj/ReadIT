import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from '../../services/book.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {

  id: string;
  private subscription: any;
  book: Book;
  books_flag: boolean;
  user: User;

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit() {

    //user init
    this.user = JSON.parse(localStorage.getItem('user_session'));
    this.user.avatar_path = "http://localhost:3000/" + this.user.avatar_path.substr(7);

    //get book
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.bookService.getBook(this.id).subscribe(
        res => {
          this.book = res;
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

}
