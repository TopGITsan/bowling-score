import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Bonus } from '../../../../model/frame.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
  selector: 'app-frame',
  standalone: true,
  styleUrl: './frame.component.scss',
  templateUrl: './frame.component.html',
})
export class FrameComponent {
  @Input() score: number | null = null;
  @Input() isCurrent: boolean = false;
  @Input() bonus: Bonus = null;
  @Input() firstAttempt: number | undefined;
  @Input() secondAttempt: number | undefined;
}
