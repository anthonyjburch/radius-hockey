import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoaliesComponent } from './goalies.component';

const routes: Routes = [{ path: '', component: GoaliesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoaliesRoutingModule { }
