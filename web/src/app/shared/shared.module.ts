import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridWrapperComponent } from './ag-grid-wrapper/ag-grid-wrapper.component';

import { AgGridModule } from 'ag-grid-angular';




@NgModule({
  declarations: [
    AgGridWrapperComponent
  ],
  imports: [
    CommonModule,
    AgGridModule
  ],
  exports: [
    AgGridWrapperComponent
  ]
})
export class SharedModule { }
