import { Frame } from './frame.model';

export interface Game {
  firstRoll: number | null;
  secondRoll: number | null;
  thirdRoll: number | null;
  frames: Frame[];
}
