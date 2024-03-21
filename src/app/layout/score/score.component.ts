import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { GameStoreService } from '../../store/game-store.service';
import { untilDestroyed } from '../../utils/app.helper';
import { FrameComponent } from '../frame/frame.component';
import { Game } from '../../model/game.model';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [FrameComponent],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent implements OnInit {
  private readonly gameStoreService: GameStoreService =
    inject(GameStoreService);

  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly untilDestroyed = untilDestroyed();

  state: Game | undefined;

  ngOnInit(): void {
    this.gameStoreService.state$.pipe(this.untilDestroyed()).subscribe((state)=> {
      this.state = state;
      this.changeDetectorRef.detectChanges();
    });
  }
}
