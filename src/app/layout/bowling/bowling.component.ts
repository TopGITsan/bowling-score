import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Bowling } from '../../model/game.model';
import { GameStoreService } from '../../store/game-store.service';
import { PlayerComponent } from './components/player/player.component';
import { ScoreComponent } from './components/score/score.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, ScoreComponent, PlayerComponent],
  selector: 'app-bowling',
  standalone: true,
  styles: `
  .table {
    text-align: center;
    margin: 3rem;
  }
  `,
  template: `
    <app-score [state]="state$ | async" />
    <section class="table">
      <app-player (roll)="onRoll()" />
    </section>
  `,
})
export class BowlingComponent {
  readonly gameStoreService: GameStoreService =
    inject(GameStoreService);

  readonly state$: Observable<Bowling> = this.gameStoreService.state$;

  onRoll() {
    this.gameStoreService.handleRoll();
  }
}
