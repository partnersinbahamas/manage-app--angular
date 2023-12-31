import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TitleComponent } from './components/title/title.component';
import { WeeksComponent } from './components/weeks/weeks.component';
import { LogoComponent } from './components/logo/logo.component';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule, Routes } from '@angular/router';
import { IconComponent } from './components/icon/icon.component';
import { IconButtonComponent } from './components/buttons/icon-button/icon-button.component';
import { DayComponent } from './components/weeks/day/day.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeekComponent } from './components/weeks/week/week.component';
import { MonthPipe } from './pipes/month.pipe';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { CircleButtonComponent } from './components/buttons/circle-button/circle-button.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoFormComponent } from './components/todo/todo-form/todo-form.component';
import { InputComponent } from './components/inputs/input/input.component';
import { SelectInputComponent } from './components/inputs/select-input/select-input.component';
import { ImportantComponent } from './components/important/important.component';

const routes: Routes = [
  {
    path: 'about',
    component:  TitleComponent
  },

  {
    path: 'details',
    component:  DetailsPageComponent,
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
    LogoComponent,
    NavComponent,
    IconComponent,
    IconButtonComponent,
    WeeksComponent,
    DayComponent,
    WeekComponent,
    MonthPipe,
    DetailsPageComponent,
    CircleButtonComponent,
    TodoComponent,
    TodoFormComponent,
    InputComponent,
    SelectInputComponent,
    ImportantComponent,
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
