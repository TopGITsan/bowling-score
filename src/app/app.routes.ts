import { Routes } from '@angular/router';
import { canActivateGame } from './core/gameFn.guard';
import { BowlingComponent } from './layout/bowling/bowling.component';

export const routes: Routes = [
  {
    path: '',
    component: BowlingComponent,
    canActivate: [canActivateGame]
  }
];
