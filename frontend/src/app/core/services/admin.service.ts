import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  approveUser(data: any) {
    return this.http.post<any>(environment.apiUrl + '/admin/approve-user', data)
  }
  rejectUser(data: any) {
    return this.http.post<any>(environment.apiUrl + '/admin/reject-user', data)
  }

  getUnapprovedUsers() {
    return this.http.get<any>(environment.apiUrl + '/admin/get-unapproved')
  }

  addGenre(data: any) {
    return this.http.post<any>(environment.apiUrl + '/admin/add-genres', data)
  }

  deleteGenre(data: any) {
    return this.http.post<any>(environment.apiUrl + '/admin/delete-genres', data)
  }

  setPrivileges(data: any) {
    return this.http.post<any>(environment.apiUrl + '/admin/set-type', data)
  }
}
