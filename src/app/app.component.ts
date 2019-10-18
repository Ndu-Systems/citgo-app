import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  location: Location;
  constructor(private router: Router) {}
  ngOnInit(): void {
    // let router = window.location.href;
    // if (!router.includes("https") && !IS_LOCAL) {
    //   window.location.href = WEB_HOST;
    // }
    if (environment.production) {
      if (location.protocol === 'http:') {
       window.location.href = location.href.replace('http', 'https');
      }
     }

    // scroll up
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  }
}
