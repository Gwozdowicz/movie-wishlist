import { Component, Input, EventEmitter, Output } from '@angular/core';
import {Movie} from "../../models/movie"
@Component({
  selector: 'movie-card',
  templateUrl: './movie_card.component.html',
  styleUrls: ['./movie_card.component.css']
})
export class MovieCardComponent {

  @Input()
  movie: Movie;

  @Output()
  heartClicked = new EventEmitter();

   heartClickedHandler(){
    this.heartClicked.emit();
   }
}
