import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Bonus } from '../../../../model/frame.model';
import { numberToString } from '../../../../utils/app.helper';

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
  @Input({ transform: numberToString }) firstAttempt: string = '';
  @Input({ transform: numberToString }) secondAttempt: string = '';
}
