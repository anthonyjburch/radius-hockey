import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoaliesRoutingModule } from './goalies-routing.module';
import { GoaliesComponent } from './goalies.component';


@NgModule({
  declarations: [
    GoaliesComponent
  ],
  imports: [
    CommonModule,
    GoaliesRoutingModule
  ]
})
export class GoaliesModule { }
