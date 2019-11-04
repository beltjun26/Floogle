import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="home">
      <h1 class="">FLOOGLE</h1>
      <div class="home-container">
        <div class="home-container-search">
          <app-search-bar></app-search-bar>
        </div>
      </div>
      <div class="home-container">
        <img
          class="home-container-logo"
          src="assets/images/pingboard.png"
        >
        <img
          class="home-container-logo"
          src="assets/images/phabricator.png"
        >
        <img
          class="home-container-logo"
          src="assets/images/dashboard.png"
        >
        <img
          class="home-container-logo"
          src="assets/images/confluence.png"
        >
      </div>
    </div>

  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
