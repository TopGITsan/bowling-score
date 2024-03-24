import { InjectionToken } from '@angular/core';
import { Bowling } from '../model/game.model';

export const initialGameState: Bowling = {
  rolls: [],
  frames: [
    {
      rolls: [],
      score: 0,
      bonus: null,
      totalScore: 0,
    },
    {
      rolls: [],
      score: 0,
      bonus: null,
      totalScore: 0,
    },
    {
      rolls: [],
      score: 0,
      bonus: null,
      totalScore: 0,
    },
    {
      rolls: [],
      score: 0,
      bonus: null,
      totalScore: 0,
    },
    {
      rolls: [],
      score: 0,
      bonus: null,
      totalScore: 0,
    },
    {
      rolls: [],
      score: 0,
      bonus: null,
      totalScore: 0,
    },
    {
      rolls: [],
      score: 0,
      bonus: null,
      totalScore: 0,
    },
    {
      rolls: [],
      score: 0,
      bonus: null,
      totalScore: 0,
    },
    {
      rolls: [],
      score: 0,
      bonus: null,
      totalScore: 0,
    },
    {
      rolls: [],
      score: 0,
      bonus: null,
      totalScore: 0,
    },
  ],
  maxFrames: 10,
  maxPins: 10,
  maxAttempsPerFrame: 2,
  currentFrameIndex: 0,
  strikeCounter: 0,
  totalScore: 0,
};

export const INITIAL_GAME_STATE: InjectionToken<Bowling> =
  new InjectionToken<Bowling>('Initial Game State', {
    providedIn: 'root',
    factory: () => initialGameState,
  });
