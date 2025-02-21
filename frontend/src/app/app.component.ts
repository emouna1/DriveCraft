
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title!: String;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Scroll to section when fragment changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const fragment = this.route.snapshot.fragment;
        if (fragment) {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
          }
        }
      });
  }

  isLoginPageOrSignupPage(): boolean {
    const currentUrl = this.router.url;
    return currentUrl.includes('/auth/login') || currentUrl.includes('/auth/signup') || currentUrl.includes('/auth/Forgot') || currentUrl.includes('/manage/dash') || currentUrl.includes('/candidate/home') ||currentUrl.includes('/instructor/home') ||currentUrl.includes('/enroll')
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const toolbar = document.querySelector('.mat-toolbar');
    if (toolbar) {
      if (window.scrollY > 50) {
        toolbar.classList.add('scrolled');
      } else {
        toolbar.classList.remove('scrolled');
      }
    }
  }
  

  
}
