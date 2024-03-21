import { Routes } from '@angular/router';
import { ScoreComponent } from './layout/score/score.component';
import { canActivateGame } from './core/gameFn.guard';

export const routes: Routes = [
  {
    path: '',
    component: ScoreComponent,
    canActivate: [canActivateGame]
  }
];
