import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LogoutService {


  constructor(private router: Router) { }


  ngOnInit(): void {
    
  }

  logout() {
    localStorage.removeItem("Token");
    this.router.navigate(['login']);
  }

}
