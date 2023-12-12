import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridWrapperComponent } from './ag-grid-wrapper/ag-grid-wrapper.component';

import { AgGridModule } from 'ag-grid-angular';
import { LoadingComponent } from './loading/loading.component';




@NgModule({
  declarations: [
    AgGridWrapperComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    AgGridModule
  ],
  exports: [
    AgGridWrapperComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
