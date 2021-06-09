import { Component, OnInit } from '@angular/core';
import { SearchMovieRequest } from './api/models/search/movie/search-movie.request';
import { ApiService } from './api/api.service';
import { finalize } from 'rxjs/operators';
import { SearchMovieResponse } from './api/models/search/movie/search-movie.response';
import { ConfigurationResponse } from './api/models/configuration/configuration.response';
import { PosterSize } from './api/models/configuration/poster-size.enum';
import { MovieSelection } from './dashboard/components/search/models/movie-selection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'letterboxd-ui';
  isApiIinProgress = false;
  isApiError = false;
  configuration: ConfigurationResponse | undefined;
  searchMovieResponse: SearchMovieResponse | undefined;

  searchRequest: SearchMovieRequest = {
    include_adult: true,
    query: 'Godfather'
  }

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // this.search();
    // this.apiService.getConfiguration().subscribe(
    //   (configuration) => {this.configuration = configuration}
    // )
  }

  search(): void {
    this.isApiIinProgress = true;
    this.apiService.searchMovie(this.searchRequest)
      .pipe(finalize(() => this.isApiIinProgress = true))
      .subscribe(
        (response: SearchMovieResponse) => this.onComplete(response),
        (error: any) => { this.isApiError = true; }
      );
  }

  onComplete(searchMovieResponse: SearchMovieResponse): void {
    this.searchMovieResponse = searchMovieResponse;
  }
}
