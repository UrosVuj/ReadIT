import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-approve-books',
  templateUrl: './approve-books.component.html',
  styleUrls: ['./approve-books.component.css']
})
export class ApproveBooksComponent implements OnInit {


  user: any;
  unapproved_books: any[];

  constructor(private bookService: BookService, private adminService: AdminService) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user_session'));
    this.user.avatar_path = "http://localhost:3000/" + this.user.avatar_path.substr(7);

    let criteria = {};
    criteria["name"] = ""
    criteria["author"] = ""
    criteria["genre"] = ""

    this.bookService.searchBooksUnapproved(criteria).subscribe(
      res => {
        if (res.found == true) {
          console.log(res);
          this.unapproved_books = res.books;
          this.unapproved_books.forEach(book => {
            book.cover_path = "http://localhost:3000/" + book.cover_path.substr(7);
          })
        }
        else console.log("no unapproved books like that")
      }
    )

  }


  approveBook(name: string, i: number) {

    this.unapproved_books.splice(i, 1);
    let data = {};
    data["name"] = name;
    this.adminService.approveBook(data).subscribe(
      res => {
        console.log(res.msg);

      }
    )
  }

  rejectBook(name: string, i: number) {

    this.unapproved_books.splice(i, 1);
    let data = {};
    data["name"] = name;
    this.adminService.rejectBook(data).subscribe(
      res => {
        console.log(res.msg);

      }
    )
  }


}
