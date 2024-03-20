import { Component } from '@angular/core';
import { FrameComponent } from '../frame/frame.component';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [FrameComponent],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss'
})
export class ScoreComponent {
}
