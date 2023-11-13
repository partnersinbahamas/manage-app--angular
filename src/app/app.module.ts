import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TitleComponent } from './components/title/title.component';
import { TodosComponent } from './components/todos/todos.component';
import { LogoComponent } from './components/logo/logo.component';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule, Routes } from '@angular/router';
import { IconComponent } from './components/icon/icon.component';
import { IconButtonComponent } from './components/buttons/icon-button/icon-button.component';
import { TodoComponent } from './components/todos/todo/todo.component';
import { DayComponent } from './components/day/day.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'about',
    component:  TitleComponent
  },

  {
    path: 'details',
    component:  TitleComponent,
  },

  {
    path: '**',
    redirectTo: 'about', 
    pathMatch: 'full',
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    TodosComponent,
    LogoComponent,
    NavComponent,
    IconComponent,
    IconButtonComponent,
    TodoComponent,
    DayComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
