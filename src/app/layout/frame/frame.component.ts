import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { numberToString } from '../../utils/app.helper';

@Component({
  selector: 'app-frame',
  standalone: true,
  imports: [NgClass],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameComponent {
  @Input() score: number | null = null;
  @Input() isCurrent: boolean = false;
  @Input({ transform: numberToString }) firstAttempt: string = '';
  @Input({ transform: numberToString }) secondAttempt: string = '';
}
