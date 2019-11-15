import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginPageComponent} from './components/login/login.component'
import { FormsModule }   from '@angular/forms';
import {LoginService} from './services/login.service';
import {LogoutService} from './services/logout.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import {DashboardComponent} from './components/dashboard/dashboard.component'
import {NavigationComponent} from './components/navigation/navigation.component'
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule } from "@angular/material/icon";
import {MovieCardComponent} from "./components/movie_card/movie_card.component";
import {MovieHeartComponent} from "./components/movie_heart/movie.heart.component"
import {MatButtonModule} from '@angular/material/button';
import {WatchlistHandler} from './services/watchlist.handler.service';
export function tokenGetter() {
  return localStorage.getItem("Token");
}
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavigationComponent,
    MovieCardComponent,
    MovieHeartComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    HttpClientModule,
    MatIconModule,
    AppRoutingModule,
    MatListModule,
    MatButtonModule,
    MaterialModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [""],
        blacklistedRoutes: [""]
      }
    }),
  ],
  providers: [LoginService, WatchlistHandler, LogoutService, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }

