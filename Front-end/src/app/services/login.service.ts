import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ROOT_URL } from 'src/app/api.config';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiURL = ROOT_URL;

  constructor(private http: HttpClient) { }

  token;
  ngOnInit(): void {
    this.token = localStorage.getItem("Token");
  }
  httpOptions = {
    headers: new HttpHeaders({
      "Authorization": "Bearer " + this.token,
      'Content-Type': 'application/json',

    })
  }

  authorize(credentials) {
    return this.http.post(this.apiURL + 'auth', credentials, this.httpOptions)
    // .pipe(
    //   catchError(this.handleError)
    // )
  }
  getUserId(credentials) {
    return this.http.post(this.apiURL + 'auth/getUserId', credentials, this.httpOptions)

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
