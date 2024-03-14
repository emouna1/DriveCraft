import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private router: Router) {}

  isLoginPageOrSignupPage(): boolean {
    const currentUrl = this.router.url;
    return currentUrl.includes('/auth/login') || currentUrl.includes('/auth/signup') || currentUrl.includes('/auth/Forgot') ;
  }

  
  title:String = 'DriveCraft'
}