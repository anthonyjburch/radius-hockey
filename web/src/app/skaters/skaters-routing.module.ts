import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkatersComponent } from './skaters.component';
import { SkatingComponent } from './skating/skating.component';
import { ShootingComponent } from './shooting/shooting.component';

const routes: Routes = [
  {
    path: '',
    component: SkatersComponent,
    children: [
      { path: 'skating', component: SkatingComponent },
      { path: 'shooting', component: ShootingComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkatersRoutingModule { }
