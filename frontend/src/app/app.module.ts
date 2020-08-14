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
import { SettingsComponent } from './core/components/settings/settings.component';
import { ApproveComponent } from './core/components/approve/approve.component';
import { GenresComponent } from './core/components/genres/genres.component';
import { AddPrivilegesComponent } from './core/components/add-privileges/add-privileges.component';
import { ApproveBooksComponent } from './core/components/approve-books/approve-books.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HomeComponent,
    SearchBooksComponent,
    BookComponent,
    ProfileComponent,
    SettingsComponent,
    ApproveComponent,
    GenresComponent,
    AddPrivilegesComponent,
    ApproveBooksComponent
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
