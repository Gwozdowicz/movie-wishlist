import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Jsonp, URLSearchParams } from '@angular/http';
import { ROOT_URL } from 'src/app/api.config';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { WishlistItem } from "../models/wishlist_item"
@Injectable({
    providedIn: 'root'
})
export class WatchlistHandler {

    apiURL = ROOT_URL;

    constructor(private http: HttpClient) { }

    token = localStorage.getItem("Token");
    ngOnInit(): void {
    }

    getWishlist():Observable<WishlistItem[]> {
        var httpOptions = {
          headers: new HttpHeaders({
            "Authorization": "Bearer " + this.token,
            'Content-Type': 'application/json'
          }),
          params: new HttpParams ().set('userId', localStorage.getItem('userId'))
        }
        return this.http.get<WishlistItem[]>(this.apiURL + 'wishlist/getwishlist', httpOptions)
    
      }

    
    checkWishlistForAMovie(movieId){


        var httpOptions = {
            headers: new HttpHeaders({
                "Authorization": "Bearer " + this.token,
                'Content-Type': 'application/json'
            }),
            params: new HttpParams()
                .append('userId', localStorage.getItem('userId'))
                .append('movieId', movieId)


        }
        return this.http.get<boolean>(this.apiURL + 'wishlist/checkWishListForItem', httpOptions)

    }

    addMovieToWatchlist(movieId){
        var httpOptions = {
            headers: new HttpHeaders({
                "Authorization": "Bearer " + this.token,
                'Content-Type': 'application/json'
            }),
            params: new HttpParams()
                .append('userId', localStorage.getItem('userId'))

        }
        return this.http.put(this.apiURL + 'wishlist/addItemToWishlist', {movieId: movieId},  httpOptions)

    }





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
