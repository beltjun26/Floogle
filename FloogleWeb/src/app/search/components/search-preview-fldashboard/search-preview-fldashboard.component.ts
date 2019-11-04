import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-preview-fldashboard',
  template: `
  <mat-card class="search-preview">
    <mat-card-title-group>
    <mat-card-title>
        <div>
          Freelancer Dashboard
        </div>
        <div>
          {{ searchResult.title }}
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
    </mat-card-content>
  </mat-card>

  <ng-container *ngIf="searchResult.meta['internal_links'].length !== 0">
    <mat-expansion-panel
      [expanded]="true"
      class="search-preview-section"
    >
      <mat-expansion-panel-header>
        <mat-panel-title>
          Sections
        </mat-panel-title>
      </mat-expansion-panel-header>
        <ng-container *ngFor="let link of searchResult.meta['internal_links']">
          <a [href]="link.url"><p>{{ link.link_name }}<mat-icon class="search-preview-section-icon">keyboard_arrow_right</mat-icon></p></a>
        </ng-container>
    </mat-expansion-panel>
  </ng-container>
  `,
  styleUrls: ['./search-preview-fldashboard.component.scss']
})
export class SearchPreviewFldashboardComponent implements OnInit {

  @Input() searchResult;

  constructor() { }

  ngOnInit() {
    console.log(this.searchResult);
  }

}
