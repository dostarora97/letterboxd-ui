export class SearchMovieRequest {
  language?: string;
  query!: string;
  page?: number;
  include_adult?: boolean;
  region?: string;
  year?: number;
  primary_release_year?: number;

  constructor(request?: SearchMovieRequest) {
    if (!!request) {
      Object.assign(this, request);
    }
  }
}
