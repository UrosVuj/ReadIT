import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './core/components/welcome/welcome.component';
import { HomeComponent } from './core/components/home/home.component';
import { BookComponent } from './core/components/book/book.component';
import { SearchBooksComponent } from './core/components/search-books/search-books.component';
import { ProfileComponent } from './core/components/profile/profile.component';
import { SettingsComponent } from './core/components/settings/settings.component';
import { ApproveComponent } from './core/components/approve/approve.component';
import { GenresComponent } from './core/components/genres/genres.component';
import { AddPrivilegesComponent } from './core/components/add-privileges/add-privileges.component';
import { ApproveBooksComponent } from './core/components/approve-books/approve-books.component';
import { OtherProfileComponent } from './core/components/other-profile/other-profile.component';
import { ChatComponent } from './core/components/chat/chat.component';
import { ChatRoomComponent } from './core/components/chat-room/chat-room.component';


const routes: Routes = [
  { path: "welcome", component: WelcomeComponent },
  { path: "", component: WelcomeComponent },
  { path: "home", component: HomeComponent },
  { path: "book/:id", component: BookComponent },
  { path: "search", component: SearchBooksComponent },
  { path: "profile", component: ProfileComponent },
  { path: "settings", component: SettingsComponent },
  { path: "admin/approve", component: ApproveComponent },
  { path: "admin/genres", component: GenresComponent },
  { path: "mod/approve-books", component: ApproveBooksComponent },
  { path: "admin/privileges", component: AddPrivilegesComponent },
  { path: "user/:id", component: OtherProfileComponent },
  { path: "chat", component: ChatComponent },
  { path: "chat-room/:id", component: ChatRoomComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
