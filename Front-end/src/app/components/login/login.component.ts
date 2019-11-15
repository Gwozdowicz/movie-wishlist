import { Component, OnInit } from '@angular/core';
//import { LoginService } from 'src/app/shared/services/login.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginPageComponent implements OnInit {

  invalidLogin: boolean = false;


  constructor(
    private router: Router,
    private loginService: LoginService
    ) {
  }

  ngOnInit() {
  }


  login(form: NgForm) {
    let credentials = JSON.stringify(form.value);

    // Authorize first
    this.loginService.authorize(credentials).subscribe(response => {
      let token = (<any>response).token;
      localStorage.setItem('Token', token);

      // Get user id
      this.loginService.getUserId(credentials).subscribe(response => {
        let userId = (<any>response).userId;
        localStorage.setItem('userId', userId);
        
        // Finally navigate to dashboard
        this.router.navigate(["/dashboard"]);
      }) 
    }, err => {
      this.invalidLogin = true;
    });
  }

}
