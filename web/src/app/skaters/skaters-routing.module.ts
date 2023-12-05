import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkatersComponent } from './skaters.component';
import { SkatingDistanceComponent } from './skating-distance/skating-distance.component';
import { SkatingSpeedComponent } from './skating-speed/skating-speed.component';

const routes: Routes = [
  {
    path: '',
    component: SkatersComponent,
    children: [
      { path: 'skating-speed', component: SkatingSpeedComponent },
      { path: 'skating-distance', component: SkatingDistanceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkatersRoutingModule { }
