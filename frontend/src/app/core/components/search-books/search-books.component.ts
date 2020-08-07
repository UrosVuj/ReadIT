import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.css']
})
export class SearchBooksComponent implements OnInit {

  constructor(private bookservice: BookService) { }

  ngOnInit(): void {
    this.search_flag = false;
    this.genre = "";
    this.author = "";
    this.name = "";
  }

  name: string;
  author: string;
  genre: string;
  books: any[];

  search_flag: boolean;

  showBooks() {
    this.books.forEach(book => {
      book.cover_path = "http://localhost:3000/" + book.cover_path.substr(7);
      console.log(book.cover_path.substr(7))
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

    this.search_flag = true;

    let criteria = {};
    criteria["name"] = this.name;
    criteria["author"] = this.author;
    criteria["genre"] = this.genre;

    this.bookservice.searchBooks(criteria).subscribe(
      res => {
        if (res.found == true) {
          this.books = res.books;
          console.log(this.books.length)
          console.log("Nice!")
          this.showBooks();
        }
        else {
          console.log("Error")
        }
      },
      err => {
        console.log("NAY")
      }
    )
  }


}
