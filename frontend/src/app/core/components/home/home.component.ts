import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user_session'));
    this.user.avatar_path = "http://localhost:3000/" + this.user.avatar_path.substr(7);

  }

  books_flag: boolean;
  user: User;

  profile() {
    this.router.navigate(['/profile'])
  }
  books() {
    this.router.navigate(['/search'])
  }
  settings() {
    this.router.navigate(['/settings'])
  }

  approveUsers() {
    this.router.navigate(['/admin/approve'])
  }
  addGenres() {
    this.router.navigate(['/admin/genres'])
  }



  logout() {

    this.storageService.removeItem('user_session')
    this.router.navigate([''])
  }

}
