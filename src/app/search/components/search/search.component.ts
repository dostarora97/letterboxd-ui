import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ConfigurationResponse } from '../../../api/models/configuration/configuration.response';
import { SearchMovieResponse } from '../../../api/models/search/movie/search-movie.response';
import { SearchMovieRequest } from '../../../api/models/search/movie/search-movie.request';
import { ApiService } from '../../../api/api.service';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'lb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends BaseComponent implements OnInit {
  isApiIinProgress$ = new BehaviorSubject<boolean>(false);
  isApiError$ = new BehaviorSubject<boolean>(false);
  // hasNoResults = false;
  configuration!: ConfigurationResponse;
  searchMovieResponse: SearchMovieResponse | undefined;

  constructor(
    private apiService: ApiService
  ) {
    super();
    this.isApiError$.subscribe(() => this.isApiIinProgress$.next(false));
  }

  ngOnInit(): void {
    this.apiService.getConfiguration()
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(
      (configuration) => {this.configuration = configuration});
  }

  search($event: String): void {
    this.isApiIinProgress$.next(true);
    let searchRequest = new SearchMovieRequest({query: String($event)});
    this.apiService.searchMovie(searchRequest)
      .pipe(
        finalize(() => this.isApiIinProgress$.next(false)),
        takeUntil(this.isDestroyed$))
      .subscribe(
        (response: SearchMovieResponse) => {
          this.onComplete(response)
        },
        (error: any) => {
          console.error(error);
          this.isApiError$.next(true);
        });
  }

  onComplete(searchMovieResponse: SearchMovieResponse): void {
    this.searchMovieResponse = searchMovieResponse;
    // if (searchMovieResponse.results.length == 0) {
    //   this.hasNoResults = true;
    // } else {
    //   this.hasNoResults = false
    //   this.searchMovieResponse = searchMovieResponse;
    // }
  }
}
