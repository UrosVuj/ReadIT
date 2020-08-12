import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  genres: [];

  constructor(private userService: UserService, private adminService: AdminService) { }

  ngOnInit(): void {

    this.userService.getGenres().subscribe(
      res => {
        this.genres = res;
      }
    )
  }

  addGenre(genre: string) {
    let data = {}
    data["name"] = genre;
    this.adminService.addGenre(data).subscribe(
      res => {
        console.log(res.msg)
      }
    );
  }

  deleteGenre(genre: string, i: number) {
    this.genres.splice(i, 1)

    let data = {}
    data["name"] = genre;
    console.log(genre);
    this.adminService.deleteGenre(data).subscribe(
      res => {
        console.log(res.msg);
      }
    );
  }





}
