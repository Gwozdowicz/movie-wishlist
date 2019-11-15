import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../../services/logout.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {



  constructor(
    private router: Router,
    private logoutSevrice: LogoutService
    ) {
  }

  ngOnInit() {
  }



  logOut (){
    this.logoutSevrice.logout()
  }
  
}
