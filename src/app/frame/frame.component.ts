import { Component, Input } from '@angular/core';
import { numberToString } from '../utils/app.helper';

@Component({
  selector: 'app-frame',
  standalone: true,
  imports: [],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss'
})
export class FrameComponent {
  @Input() score: number = 0;
  @Input({transform: numberToString}) firstAttempt: string = '';
  @Input({transform: numberToString}) secondAttempt: string = '';

}
