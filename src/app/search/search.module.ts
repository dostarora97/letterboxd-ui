import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [ SearchResultsComponent, SearchFormComponent, SearchComponent ],
  exports: [
    SearchResultsComponent,
    SearchFormComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    MatProgressSpinnerModule
  ]
})
export class SearchModule { }
