import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { SearchHeaderComponent } from './components/search-header/search-header.component';
import { SearchBodyComponent } from './components/search-body/search-body.component';
import { CoreModule } from '../core/core.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchPreviewPingboardComponent } from './components/search-preview-pingboard/search-preview-pingboard.component';
import { SearchPreviewFldashboardComponent } from './components/search-preview-fldashboard/search-preview-fldashboard.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    SearchComponent,
    SearchHeaderComponent,
    SearchBodyComponent,
    SearchResultComponent,
    SearchPreviewPingboardComponent,
    SearchPreviewFldashboardComponent,
  ],
  imports: [
    MatCardModule,
    MatDividerModule,
    CommonModule,
    SearchRoutingModule,
    CoreModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class SearchModule { }
