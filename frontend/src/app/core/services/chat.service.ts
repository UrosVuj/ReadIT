import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  addChat(data: any) {
    return this.http.post<any>(environment.apiUrl + '/chat/add', data)
  }

  getAllChats() {
    return this.http.get<any>(environment.apiUrl + '/chat/get-all')
  }

  getOneChat(chat_id: string) {
    return this.http.get<any>(environment.apiUrl + '/chat/get/' + chat_id)
  }
}
