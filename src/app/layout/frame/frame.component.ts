import { Component, Input } from '@angular/core';
import { numberToString } from '../../utils/app.helper';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-frame',
  standalone: true,
  imports: [NgClass],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss'
})
export class FrameComponent {
  @Input() score: number = 0;
  @Input() isCurrent: boolean = false;
  @Input({transform: numberToString}) firstAttempt: string = '';
  @Input({transform: numberToString}) secondAttempt: string = '';

}
