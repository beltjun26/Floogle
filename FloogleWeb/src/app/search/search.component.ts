import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchService } from '../services/search.service';
import { SearchResult } from './search.model';

@Component({
  selector: 'app-search',
  template: `
    <app-search-header
      [searchKeyword]="(keyword | async)"
    ></app-search-header>
    <app-search-body
      [searchResults$]="searchResults"
    ></app-search-body>
  `,
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  keyword: Observable<string>;
  searchResults: Observable<SearchResult[]>;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.keyword = this.route.queryParams.pipe(map(params => {
      return params.q === undefined ? '' : params.q;
    }));

    this.keyword.subscribe(keyword => {
      this.searchResults = this.searchService.search(keyword);
    });
  }

}
