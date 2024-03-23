import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { Bowling } from '../../model/game.model';
import { GameStoreService } from '../../store/game-store.service';
import { untilDestroyed } from '../../utils/app.helper';
import { PlayerComponent } from './components/player/player.component';
import { ScoreComponent } from './components/score/score.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScoreComponent, PlayerComponent],
  selector: 'app-bowling',
  standalone: true,
  styles: `
  .table {
    text-align: center;
    margin: 3rem;
  }
  `,
  template: `
    <app-score [state]="state" />
    <section class="table">
      <app-player (roll)="onRoll()" />
    </section>
  `,
})
export class BowlingComponent {
  private readonly gameStoreService: GameStoreService =
    inject(GameStoreService);

  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly untilDestroyed = untilDestroyed();

  state: Bowling | undefined;

  ngOnInit(): void {
    this.gameStoreService.state$
      .pipe(this.untilDestroyed())
      .subscribe((state) => {
        this.state = state;
        this.changeDetectorRef.detectChanges();
      });
  }

  onRoll() {
    this.gameStoreService.handleRoll();
  }
}
