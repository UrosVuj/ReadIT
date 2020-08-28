import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { RecaptchaModule } from 'ng-recaptcha';
import { GoogleChartsModule } from 'angular-google-charts';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//material
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { OtherProfileComponent } from './core/components/other-profile/other-profile.component';
import { ChatComponent } from './core/components/chat/chat.component';
import { ChatRoomComponent } from './core/components/chat-room/chat-room.component';


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
    ApproveBooksComponent,
    OtherProfileComponent,
    ChatComponent,
    ChatRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule,
    RatingModule,
    GoogleChartsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
