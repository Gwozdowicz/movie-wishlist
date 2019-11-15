import { Component, OnInit } from '@angular/core';
//import { LoginService } from 'src/app/shared/services/login.service';
import { Router } from '@angular/router';
import { LogoutService } from '../../services/logout.service';
import { MovieGetter } from '../../services/movie.getter.service';
import {WatchlistHandler}  from '../../services/watchlist.handler.service'
import {Movie} from "../../models/movie"
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private latestMoviesList: Movie[] ;
  private wishListMovieList: Movie[];
  constructor(
    private router: Router,
    private logoutSevrice: LogoutService,
    private movieGetter: MovieGetter,
    private watchlistHandler: WatchlistHandler
  ) {
  }

  ngOnInit() {
    this.getWishList()
    this.getLatestMovies();
  }
  getMovies() {
    // Obsolete
    console.log(localStorage.getItem('userId'))
  }
  getMoviePosterPath(imagePath) {
    return 'https://image.tmdb.org/t/p/w500' + imagePath
  }

  getPopularMovies() {

    this.movieGetter.getPopular().subscribe(response => { this.latestMoviesList = response['results'] });

  }
  getLatestMovies() {

    this.movieGetter.getLatest().subscribe(response => { this.latestMoviesList = response['results'] });

  }

  getWishList() {
    this.wishListMovieList = [];
    this.watchlistHandler.getWishlist()
      .subscribe(response => {
        response.forEach(el => this.movieGetter.getById((el.movie_id))
          .subscribe(movie => {
            this.wishListMovieList.push(movie)
          }

          )
        );

      })
  }

  refreshWishlist(){
    this.getWishList()
  }

  logout() {
    this.logoutSevrice.logout()
  }

}
