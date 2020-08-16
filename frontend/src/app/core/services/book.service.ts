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

  searchBooksUnapproved(data: any) {
    return this.http.post<any>(environment.apiUrl + '/search-books-unapproved', data)
  }

  addBook(form: FormData) {
    return this.http.post<any>(environment.apiUrl + '/add-book', form)
  }

  getBook(id: string) {
    return this.http.get<any>(environment.apiUrl + '/book/' + id)
  }

  createList(data: any) {
    return this.http.post<any>(environment.apiUrl + '/book/create-list', data);
  }

  getReadingLists(id: string) {
    return this.http.get<any>(environment.apiUrl + '/book/lists/' + id)
  }

  addBookToList(data: any, list_type: string) {
    if (list_type == "want_to_read")
      return this.http.post<any>(environment.apiUrl + '/book/add-list/future', data)
    else
      if (list_type == "finished_reading")
        return this.http.post<any>(environment.apiUrl + '/book/add-list/past', data)
      else
        return this.http.post<any>(environment.apiUrl + '/book/add-list/present', data)
  }

  addComment(data: any) {
    return this.http.post<any>(environment.apiUrl + "/book/add-comment", data)
  }

  getComments(id: string) {
    return this.http.get<any>(environment.apiUrl + "/book/get-comments/" + id)
  }

  updateBook(data: any) {
    return this.http.post<any>(environment.apiUrl + '/book/update-book', data)
  }

  setProgress(data: any) {
    return this.http.post<any>(environment.apiUrl + '/book/set-progress', data)
  }

  getLists2(id: string) {
    return this.http.get<any>(environment.apiUrl + "/book/get-lists/" + id)
  }

  removeFromList(data: any) {
    return this.http.post<any>(environment.apiUrl + '/book/remove-from-list', data)
  }



}
