import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-preview-pingboard',
  template: `
  <mat-card class="search-preview">
    <mat-card-title-group>
      <img 
        img
        mat-card-md-image
        [src]="searchResult.meta.avatar_urls.medium" class="example-header-image">
      <mat-card-title>
        <div>
          {{searchResult.meta.first_name + ' ' + searchResult.meta.last_name}}
        </div>
        <div *ngIf="searchResult.meta.nickname">
          "{{searchResult.meta.nickname}}"
        </div>
      </mat-card-title>
      <mat-card-subtitle>
        <div
          class="search-result-subtitle"
        >
          {{searchResult.meta.job_title}}
        </div>
      </mat-card-subtitle>
    </mat-card-title-group>
    <mat-card-content>
      <div class="search-preview-bio">
        {{searchResult.meta.bio}}
      </div>
      <mat-divider></mat-divider>
      <div class="search-preview-extra">
        <div class="mat-body-strong">
          Email:
        </div>
        <div class="mat-body">
          {{searchResult.meta.email}}
        </div>
        <ng-container *ngIf="searchResult.meta.phone">
          <div class="mat-body-strong">
            Mobile:
          </div>
          <div class="mat-body">
            {{searchResult.meta.phone}}
          </div>
        </ng-container>
      </div>
    </mat-card-content>
  </mat-card>
  `,
  styleUrls: ['./search-preview-pingboard.component.scss']
})
export class SearchPreviewPingboardComponent implements OnInit {

  @Input() searchResult;

  constructor() { }

  ngOnInit() {
  }

}
