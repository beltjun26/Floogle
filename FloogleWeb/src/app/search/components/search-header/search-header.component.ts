import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-header',
  template: `
    <div class="search-header">
      <h1
        (click)="home()"
        class="search-header-logo">Floogle</h1>
      <app-search-bar
        class="search-header-search-bar"
        [searchKeyword]="searchKeyword"
      ></app-search-bar>
    </div>
    <mat-divider></mat-divider>
  `,
  styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent implements OnInit {
  @Input() searchKeyword = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  home() {
    this.router.navigate(['/']);
  }

}
