import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  template: `
    <div class="search">
      <input
        #searchField
        class="search-input"
        aria-label="Search"
        minlength="3"
        name="query"
        placeholder="Search"
        type="search"
        [value]="searchKeyword"
        (keyup.enter)="search(searchField)">
      <button
        class="search-button"
        (click)="search(searchField)"
      >
        <svg
          class="search-svg"
          viewbox="0 0 24 24"
        >
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91
          13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5
          4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </button>
    </div>
  `,
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() searchKeyword = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  search(searchField: HTMLInputElement) {
    if (searchField.value) {
      this.router.navigate(['/search'], { queryParams: { q: searchField.value } });
    }
  }
}
