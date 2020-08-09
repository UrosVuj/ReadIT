import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.css']
})
export class SearchBooksComponent implements OnInit {

  constructor(private bookservice: BookService, private router: Router) { }

  ngOnInit(): void {
    this.search_flag = 1;
    this.genre = "";
    this.author = "";
    this.search_name = "";

  }

  search_name: string;
  author: string;
  genre: string;
  books: any[];

  search_flag: number;
  secondform_flag: boolean;

  //for adding a book
  addBook: boolean;
  addBookButtonFlag: boolean;

  authors: String;
  genres: String
  name: string;
  description: string;
  date_of_publishing: Date;
  cover: File;

  book: Book;


  showBooks() {
    if (this.books.length == 0) {
      this.addBookButtonFlag = true;
    }
    this.books.forEach(book => {
      book.cover_path = "http://localhost:3000/" + book.cover_path.substr(7);
      console.log(book.cover_path.substr(7))
      console.log(book.name)
    });

    //test
    this.books = this.books.reduce((acc, col, i) => {
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


    console.log(this.books)

  }


  search() {

    let criteria = {};
    criteria["name"] = this.search_name;
    criteria["author"] = this.author;
    criteria["genre"] = this.genre;

    this.bookservice.searchBooks(criteria).subscribe(
      res => {
        if (res.found == true) {
          this.books = res.books;
          console.log(this.books);
          this.search_flag = 2;
          this.showBooks();
        }
        else {
          this.addBookButtonFlag = true;
          this.search_flag = 3;
        }
      },
      err => {
        console.log("NAY")
      }
    )
  }

  goto_book(id: string) {
    console.log("Going to book ID:" + id);
    this.router.navigate(['/book/' + id])
  }

  add_book() {

    let form = new FormData();
    let authors_arr = this.authors.split(', ');
    let genres_arr = this.genres.split(', ');
    form.append('name', this.name);
    form.append('authors', JSON.stringify(authors_arr));
    form.append('genres', JSON.stringify(genres_arr));
    form.append('date_of_publishing', this.date_of_publishing.toString());
    form.append('avg_score', "");
    form.append('description', this.description);
    form.append('cover', this.cover);

    //calls service which can send a http post req
    this.bookservice.addBook(form).subscribe(
      res => {
        console.log(res);
        this.book = res;
      }
    );

  }

  upload_img(event) {
    if (event.target.files.length > 0)
      this.cover = event.target.files[0];
  }

  set_AddBookFlag() {
    this.addBook = true;
  }

  form_partTwo() {
    {
      var form_tohide = document.getElementById('first_form');
      form_tohide.style.display = 'none';

      this.secondform_flag = true;
    };
  }

}
