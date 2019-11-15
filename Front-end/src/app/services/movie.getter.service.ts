import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient,HttpParams} from '@angular/common/http';
import { Jsonp, URLSearchParams } from '@angular/http';
import { ROOT_URL } from 'src/app/api.config';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import {WishlistItem} from "../models/wishlist_item";
import {Movie} from "../models/movie";
@Injectable({
  providedIn: 'root'
})
export class MovieGetter {

  apiURL = ROOT_URL;

  constructor(private http: HttpClient) { }

  token = localStorage.getItem("Token");
  ngOnInit(): void {
  }
 
 
  getLatest() {
    var httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
        'Content-Type': 'application/json',
      })
    }
    return this.http.get<Movie[]>(this.apiURL + 'movies/latest', httpOptions)

  }
  
  getPopular(page) {
    var httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
        'Content-Type': 'application/json',
      }),
      params: new HttpParams()
          .append('page', page)
    }
    return this.http.get<Movie[]>(this.apiURL + 'movies/popular', httpOptions)
  }
  getById(id) {
    var httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
        'Content-Type': 'application/json',
      })
    }
    return this.http.get<Movie>(this.apiURL + `movies/${id}`, httpOptions)
  }
  // getInTheaters() {
  //   var search = new URLSearchParams();
  //   search.set('primary_release_date.gt', '2015-10-20');
  //   search.set('primary_release_date.lte', '2015-12-20');
  //   search.set('sort_by','popularity.desc');
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/discover/movie?callback=JSONP_CALLBACK', {search})
  //     .map(res => {
  //       return res.json();
  //     })
  // }

  // getTopRatedMovies() {
  //   var search = new URLSearchParams();
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/movie/top_rated?callback=JSONP_CALLBACK', {search})
  //     .map(res => {
  //       return res.json();
  //     })
  // }

  // searchMovies(searchStr: string) {
  //   var search = new URLSearchParams();
  //   search.set('sort_by','popularity.desc');
  //   search.set('query', searchStr);
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/search/movie?callback=JSONP_CALLBACK', {search})
  //     .map(res => {
  //       return res.json();
  //     })
  // }

  // getMovie(id: string) {
  //   var search = new URLSearchParams();
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/movie/'+ id +'?callback=JSONP_CALLBACK', {search})
  //     .map(res => {
  //       return res.json();
  //     })
  // }

  // getGenres() {
  //   var search = new URLSearchParams();
  //   search.set('language', 'en-US');
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/genre/movie/list?callback=JSONP_CALLBACK', {search})
  //     .map(res => {
  //       return res.json();
  //     })
  // }

  // getMoviesByGenre(id: string) {
  //   var search = new URLSearchParams();
  //   search.set('api_key', this.apikey);
  //   return this._jsonp.get('https://api.themoviedb.org/3/genre/'+ id +'/movies?callback=JSONP_CALLBACK', {search})
  //     .map(res => {
  //       return res.json();
  //     })
  // }


  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
