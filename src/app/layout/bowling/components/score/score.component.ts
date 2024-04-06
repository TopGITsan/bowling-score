import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { Bowling } from '../../../../model/game.model';
import { FrameComponent } from '../frame/frame.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FrameComponent],
  selector: 'app-score',
  standalone: true,
  styleUrl: './score.component.scss',
  templateUrl: './score.component.html',
})
export class ScoreComponent {
  @Input() state?: Bowling | null;

}
