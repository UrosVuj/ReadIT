import { Component, OnInit } from '@angular/core';
import { StorageService } from './core/services/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  user_flag: boolean;

  user: any;
  constructor(private storageService: StorageService) { }

  ngOnInit() {

    //ukoliko idemo refresh, ostaje ulogovan da bi prikazao lepo sve
    //jedino ako se izloguje skida usera is storage i tada implementirati da ne moze ostale strane pridje kao korisnik
    if (JSON.parse(localStorage.getItem('user_session')))
      this.user_flag = true

    this.storageService.watchStorage().subscribe((data: string) => {

      let user = JSON.parse(localStorage.getItem('user_session'));
      if (user)
        this.user_flag = true;
      else
        this.user_flag = false;
    })

  }
}
