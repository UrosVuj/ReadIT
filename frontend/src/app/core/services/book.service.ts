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
}