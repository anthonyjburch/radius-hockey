import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SkatersRoutingModule } from './skaters-routing.module';
import { SkatersComponent } from './skaters.component';
import { SkatingDistanceComponent } from './skating-distance/skating-distance.component';
import { SkatingSpeedComponent } from './skating-speed/skating-speed.component';
import { SharedModule } from '../shared/shared.module';
import { ShotSpeedComponent } from './shot-speed/shot-speed.component';

@NgModule({
  declarations: [
    SkatersComponent,
    SkatingDistanceComponent,
    SkatingSpeedComponent,
    ShotSpeedComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SkatersRoutingModule,
  ]
})
export class SkatersModule { }
