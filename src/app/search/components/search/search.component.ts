import { Component, OnInit } from '@angular/core';
import { ConfigurationResponse } from '../../../api/models/configuration/configuration.response';
import { SearchMovieResponse } from '../../../api/models/search/movie/search-movie.response';
import { SearchMovieRequest } from '../../../api/models/search/movie/search-movie.request';
import { ApiService } from '../../../api/api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'lb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  isApiIinProgress = false;
  isApiError = false;
  hasNoResults = false;
  configuration: ConfigurationResponse | undefined;
  searchMovieResponse: SearchMovieResponse | undefined;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getConfiguration().subscribe(
      (configuration) => {this.configuration = configuration});
  }

  search($event: String): void {
    this.isApiIinProgress = true;
    let searchRequest = new SearchMovieRequest();
    searchRequest.query = String($event);
    this.apiService.searchMovie(searchRequest)
      .pipe(finalize(() => this.isApiIinProgress = false))
      .subscribe(
        (response: SearchMovieResponse) => this.onComplete(response),
        (error: any) => { this.isApiError = true; }
      );
  }

  onComplete(searchMovieResponse: SearchMovieResponse): void {
    if (searchMovieResponse.results.length == 0) {
      this.hasNoResults = true;
    } else {
      this.hasNoResults = false
      this.searchMovieResponse = searchMovieResponse;
    }
  }
}
