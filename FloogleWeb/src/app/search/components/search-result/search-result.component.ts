import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-result',
  template: `
  <mat-card class="search-result">
    <mat-card-header>
      <img
        *ngIf="searchResult.type === 'pingboard'"
        class="example-header-image"
        mat-card-avatar src="assets/images/pingboard.png"
      >
      <img
        *ngIf="searchResult.type === 'phabricator-2019-10'"
        class="example-header-image"
        mat-card-avatar src="assets/images/phabricator.png"
      >
      <img
        *ngIf="searchResult.type === 'fl-dashboard'"
        class="example-header-image"
        mat-card-avatar src="assets/images/dashboard.png"
      >
      <img
        *ngIf="searchResult.type === 'website'"
        class="example-header-image"
        mat-card-avatar src="assets/images/website.png"
      >
      <mat-card-title>
        <a
        class="search-result-link"
        [href]="searchResult.url"
      >
        {{searchResult.title}}
      </a>
      </mat-card-title>
      <mat-card-subtitle>
      <div
        class="search-result-subtitle"
      >
        {{ (searchResult.url.length>70)? (searchResult.url | slice:0:70)+'..':(searchResult.url)  }}
      </div>
      </mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <div class="search-result-content">
        <p>
          <!-- Fix this to show the content that matches the query -->
          {{ searchResult.content[0] }}
          {{ searchResult.content[1] }}
          {{ searchResult.content[2] }}
        </p>
      </div>
    </mat-card-content>
  </mat-card>
  `,
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  @Input() searchResult;
  constructor() { }

  ngOnInit() {
  }

}
