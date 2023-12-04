import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkatersRoutingModule } from './skaters-routing.module';
import { SkatersComponent } from './skaters.component';
import { SkatingComponent } from './skating/skating.component';
import { ShootingComponent } from './shooting/shooting.component';


@NgModule({
  declarations: [
    SkatersComponent,
    SkatingComponent,
    ShootingComponent
  ],
  imports: [
    CommonModule,
    SkatersRoutingModule
  ]
})
export class SkatersModule { }
