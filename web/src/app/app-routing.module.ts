import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'skaters', loadChildren: () => import('./skaters/skaters.module').then(m => m.SkatersModule) },
  { path: 'goalies', loadChildren: () => import('./goalies/goalies.module').then(m => m.GoaliesModule) },
  { path: 'teams', loadChildren: () => import('./teams/teams.module').then(m => m.TeamsModule) }
  // { path: '**', redirectTo: 'skaters' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
