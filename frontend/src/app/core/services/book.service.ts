import { Injectable } from '@angular/core';
import { Book } from '../../models/book';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  _book = {} as Book;


  searchBooks(data: any) {
    return this.http.post<any>(environment.apiUrl + '/search-books', data)
  }

  getBook(id: string) {
    return this.http.get<any>(environment.apiUrl + '/book/' + id)
  }

  getReadingLists(id: string) {
    return this.http.get<any>(environment.apiUrl + '/book/lists/' + id)
  }
}
