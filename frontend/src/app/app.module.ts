import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { RecaptchaModule } from 'ng-recaptcha';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './core/components/welcome/welcome.component';
import { HomeComponent } from './core/components/home/home.component';
import { SearchBooksComponent } from './core/components/search-books/search-books.component';
import { BookComponent } from './core/components/book/book.component';
import { ProfileComponent } from './core/components/profile/profile.component';
import { RatingModule } from 'ng-starrating';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HomeComponent,
    SearchBooksComponent,
    BookComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule,
    RatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
