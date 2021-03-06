import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  _user = {} as User;

  registerRequest(form: FormData) {
    return this.http.post<any>(environment.apiUrl + '/register', form)
  }

  loginRequest(data: any) {
    return this.http.post<any>(environment.apiUrl + '/login', data)
  }

  getComments(id: string) {
    return this.http.get<any>(environment.apiUrl + '/user/get-comments/' + id)
  }

  updateProfile(data: any) {
    return this.http.post<any>(environment.apiUrl + '/user/update-profile', data)
  }

  changePassword(data: any) {
    return this.http.post<any>(environment.apiUrl + '/user/update-password', data)
  }



  getGenres() {
    return this.http.get<any>(environment.apiUrl + '/user/get-genres/')
  }

  getUsers() {
    return this.http.get<any>(environment.apiUrl + '/user/get-users/')
  }

  getUserProfile(username: string) {
    return this.http.get<any>(environment.apiUrl + '/user-profile/' + username)
  }

  checkPassword(data: any) {
    return this.http.post<any>(environment.apiUrl + '/user/check-password/', data)
  }

}
