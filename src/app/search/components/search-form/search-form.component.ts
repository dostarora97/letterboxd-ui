import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lb-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  movie = "";
  @Output() movieSearch = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.movieSearch.emit(this.movie);
  }
}
