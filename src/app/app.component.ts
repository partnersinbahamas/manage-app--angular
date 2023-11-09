import { Component } from '@angular/core';
import { navigations } from './../helpers/variables';
import { Nav } from './types/nav';
import {NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navs: Nav[] = navigations;

  href: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.href = event.url.split('/')[1];
      }
    })
  }
}
