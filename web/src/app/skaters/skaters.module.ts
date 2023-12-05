import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkatersRoutingModule } from './skaters-routing.module';
import { SkatersComponent } from './skaters.component';
import { SkatingDistanceComponent } from './skating-distance/skating-distance.component';
import { SkatingSpeedComponent } from './skating-speed/skating-speed.component';

@NgModule({
  declarations: [
    SkatersComponent,
    SkatingDistanceComponent,
    SkatingSpeedComponent,
  ],
  imports: [
    CommonModule,
    SkatersRoutingModule
  ]
})
export class SkatersModule { }
