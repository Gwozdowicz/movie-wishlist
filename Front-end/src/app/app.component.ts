import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Movie Wishlist';
  router2: string;
  routeHidden = true;

  constructor(private router: Router,
    private jwtHelper: JwtHelperService) {
  }
  ngOnInit() {
    
    var token = localStorage.getItem("deviceManagerToken");

    if (token && !this.jwtHelper.isTokenExpired(token) &&
      (this.router.url === "/login")) 
      {
        
        this.router.navigate(["/dashboard"]);
    }
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        if (e.url === "/login" || e.url === "/") {
          this.routeHidden = false;
        } else {
          this.routeHidden = true;
        }
        if (token && !this.jwtHelper.isTokenExpired(token) &&
          (e.url === "/login" || e.url === "/")) {
          this.router.navigate(["/dashboard"]);
        }
      }
    })
  }
}

