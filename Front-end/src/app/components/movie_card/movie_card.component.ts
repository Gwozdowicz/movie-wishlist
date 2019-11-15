import { Component, Input } from '@angular/core';

@Component({
  selector: 'movie-card',
  templateUrl: './movie_card.component.html',
  styleUrls: ['./movie_card.component.css']
})
export class MovieCardComponent {

  @Input()
  movie: Object;

}
