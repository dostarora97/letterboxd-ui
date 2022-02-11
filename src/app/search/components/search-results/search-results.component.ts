import { Component, Input, OnInit } from '@angular/core';
import { MovieSelection } from './models/movie-selection';
import { Movie } from '../../../shared/models/movie';
import { ConfigurationResponse } from '../../../api/models/configuration/configuration.response';
import { PosterSize } from '../../../api/models/configuration/poster-size.enum';
import { SortType } from './models/sort-type.enum';

@Component({
  selector: 'lb-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  @Input()
  set movies(movies: Movie[]) {
    this.movieSelections = [];
    movies.forEach(movie => {
      this.movieSelections.push({...movie, isSelected: false})
    });
    console.log(movies, this.movieSelections);
  }

  @Input() configuration!: ConfigurationResponse;
  // @Input() sortBy: SortType = SortType.POPULARITY;

  posterSize = PosterSize;
  movieSelections: MovieSelection[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  toggleSelection(movie: MovieSelection): void {
    movie.isSelected = !movie.isSelected;
  }

  // sortMovies(): void {
  //   if (!!this.movieSelections && this.movieSelections.length > 0) {
  //     this.movieSelections.sort((a, b) => {
  //
  //       if (!!a[this.sortBy] && !!b[this.sortBy]) {
  //         let first: number = Number(a[this.sortBy]) | 0;
  //         let second: number = Number(b[this.sortBy]) | 0;
  //         return 0 - (first - second);
  //       }
  //       return 0;});
  //   }
  // }
}
