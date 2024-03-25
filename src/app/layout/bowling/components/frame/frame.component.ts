import { NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Bonus } from '../../../../model/frame.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgStyle],
  selector: 'app-frame',
  standalone: true,
  styleUrl: './frame.component.scss',
  templateUrl: './frame.component.html',
})
export class FrameComponent {
  @Input() bonus: Bonus = null;
  @Input() firstAttempt: number | undefined;
  @Input() isCurrent: boolean = false;
  @Input() isLastFrame: boolean = true;
  @Input() rolls: number[] = [];
  @Input() score: number | null = null;
  @Input() secondAttempt: number | undefined;
}
