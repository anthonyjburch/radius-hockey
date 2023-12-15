import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridWrapperComponent } from './ag-grid-wrapper/ag-grid-wrapper.component';

import { AgGridModule } from 'ag-grid-angular';
import { LoadingComponent } from './loading/loading.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { RouterModule } from '@angular/router';
import { HorizontalScrollNavigationComponent } from './horizontal-scroll-navigation/horizontal-scroll-navigation.component';




@NgModule({
  declarations: [
    AgGridWrapperComponent,
    LoadingComponent,
    MainNavigationComponent,
    HorizontalScrollNavigationComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    AgGridModule
  ],
  exports: [
    AgGridWrapperComponent,
    LoadingComponent,
    MainNavigationComponent,
    HorizontalScrollNavigationComponent
  ]
})
export class SharedModule { }
