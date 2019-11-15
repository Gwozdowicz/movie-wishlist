import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {WatchlistHandler}  from '../../services/watchlist.handler.service'
import {Movie} from "../../models/movie"

@Component({
  selector: 'movie-heart',
  templateUrl: './movie.heart.component.html',
  styleUrls: ['./movie.heart.component.css']
})
export class MovieHeartComponent implements OnInit {

    @Input()
    movie: Movie;
    @Output() 
    buttonClicked = new EventEmitter();

    buttonDisabled = false;
  constructor(private watchlistHandler: WatchlistHandler ) {
  }

  ngOnInit() {
      this.checkIfInWatchlist()
  }

  checkIfInWatchlist(){
    this.watchlistHandler.checkWishlistForAMovie(this.movie.id).subscribe(response => this.buttonDisabled = response)
  }
  addMovieToWatchlist(){
    this.watchlistHandler.addMovieToWatchlist(this.movie.id).subscribe(response => this.buttonDisabled = true)
    this.buttonClicked.emit()
}

  
}
