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

}