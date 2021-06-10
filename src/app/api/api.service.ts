import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchMovieRequest } from './models/search/movie/search-movie.request';
import { SearchMovieResponse } from './models/search/movie/search-movie.response';
import { ApiEndpoint } from './models/api-endpoint.enum';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ConfigurationResponse } from './models/configuration/configuration.response';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "https://api.themoviedb.org/3";
  private API_KEY = "a69a2253732c52ca0ccd083a0c30fbf4";
  private isConfigurationLoaded = false;
  private configuration!: ConfigurationResponse;

  constructor(private http: HttpClient) {}

  getConfiguration(): Observable<ConfigurationResponse> {
    if (this.isConfigurationLoaded) {
      return of(this.configuration);
    } else {
      return this.http.get<ConfigurationResponse>(
        this.baseUrl.concat(ApiEndpoint.CONFIGURATION), { params: this.buildParams() })
        .pipe(tap(
          (configuration: ConfigurationResponse) => {
            this.configuration = configuration;
            this.isConfigurationLoaded = true;
          },
          (error: any) => {
            this.isConfigurationLoaded= false;
          }));
    }
  }

  searchMovie(request: SearchMovieRequest): Observable<SearchMovieResponse> {
    return this.http.get<SearchMovieResponse>(
      this.baseUrl.concat(ApiEndpoint.SEARCH_MOVIE),
      { params: this.buildParams(request) });
  }

  private buildParams(request?: any) {
    const httpParams = new HttpParams({fromObject: request});
    return httpParams.set("api_key", this.API_KEY);
  }
}
