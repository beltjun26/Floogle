import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from '../../search.model';

@Component({
  selector: 'app-search-body',
  template: `
  <div class="search-body">
    <ng-container *ngIf="(searchResults$ | async) as searchResults">
      <ng-container *ngIf="searchResults.length !== 0; else noResult">
        <div class="search-body-primary">
            <ng-container *ngFor="let searchResult of searchResults">
              <app-search-result
                [searchResult]="searchResult">
              </app-search-result>
            </ng-container>
            </div>
            
        <div class="search-body-secondary">
        <app-search-preview-pingboard
        *ngIf="searchResults[0].type === 'pingboard'"
        [searchResult]="searchResults[0]"
        >
        </app-search-preview-pingboard>
        <app-search-preview-fldashboard
        *ngIf="searchResults[0].type === 'fl-dashboard'"
        [searchResult]="searchResults[0]"
        >
        </app-search-preview-fldashboard>
        </div>
      </ng-container>
    </ng-container>

    <ng-template #noResult>
      Ooopppss. We cannot find any match
    </ng-template>
  </div>
  `,
  styleUrls: ['./search-body.component.scss']
})
export class SearchBodyComponent implements OnInit {

  @Input() searchResults$;

  constructor() { }

  ngOnInit() {
  }

}
