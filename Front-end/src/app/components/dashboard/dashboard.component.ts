import { Component, OnInit, HostListener } from '@angular/core';
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
  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
      // visible height + pixel scrolled >= total height 
      if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
        this.getPopularMovies(this.currentPopularListPage)
      }
  }
  private latestMoviesList: Movie[] = [] ;
  private wishListMovieList: Movie[] = [];
  private currentPopularListPage = 1;
  constructor(
    private router: Router,
    private logoutSevrice: LogoutService,
    private movieGetter: MovieGetter,
    private watchlistHandler: WatchlistHandler
  ) {
  }

  ngOnInit() {
    this.getWishList()
    this.getInitialPopularMovies();
  }
  getMovies() {
    // Obsolete
    //console.log(localStorage.getItem('userId'))
  }
  getMoviePosterPath(imagePath) {
    return 'https://image.tmdb.org/t/p/w500' + imagePath
  }

  getPopularMovies(page) {
    this.currentPopularListPage += 1;
    this.movieGetter.getPopular(page).subscribe(response => {this.latestMoviesList = this.latestMoviesList.concat(response['results'])  });

  }
  getInitialPopularMovies() {
    this.currentPopularListPage += 1;
    this.movieGetter.getPopular(1).subscribe(response => { this.latestMoviesList = response['results']  });
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
