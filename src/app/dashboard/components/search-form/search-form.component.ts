import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lb-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  movie = "";

  constructor() { }

  ngOnInit(): void {
  }


}
