import { WEB_HOST, IS_LOCAL } from './shared/config';
import { Router, NavigationEnd } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    let router = window.location.href;
    if (!router.includes("https") && !IS_LOCAL) {
      window.location.href = WEB_HOST;
    }

    //scroll up
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }
  title = "citgo-app";
}
