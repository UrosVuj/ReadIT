import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './core/components/welcome/welcome.component';
import { HomeComponent } from './core/components/home/home.component';
import { BookComponent } from './core/components/book/book.component';


const routes: Routes = [
  { path: "welcome", component: WelcomeComponent },
  { path: "", component: WelcomeComponent },
  { path: "home", component: HomeComponent },
  { path: "book/:id", component: BookComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
