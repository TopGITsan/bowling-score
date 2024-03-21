import { InjectionToken } from '@angular/core';
import { Game } from '../model/game.mode';

export const initialGameState: Game = {
  firstRoll: null,
  secondRoll: null,
  thirdRoll: null,
  frames: [],
};

export const INITIAL_GAME_STATE: InjectionToken<Game> =
  new InjectionToken<Game>('Initial Game State', {
    providedIn: 'root',
    factory: () => initialGameState,
  });
