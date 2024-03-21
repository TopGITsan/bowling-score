import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  concatMap,
  delay,
  distinctUntilChanged,
  map,
  of,
  take,
  tap,
} from 'rxjs';
import { Frame } from '../model/frame.model';
import { Game } from '../model/game.model';
import { random, untilDestroyed } from '../utils/app.helper';
import {
  BowlingActions,
  GameActionsType,
  NewFrameAction,
  StartAction,
  StoreRollAction,
} from './game.actions';
import { INITIAL_GAME_STATE } from './game.state';
import { roll } from './game.utils';

@Injectable({
  providedIn: 'root',
})
export class GameStoreService {
  private readonly initialGameState = inject(INITIAL_GAME_STATE);
  private readonly untilDestroyed = untilDestroyed();
  // action
  private readonly actionsSubject: Subject<BowlingActions> = new Subject();
  readonly actions$: Observable<BowlingActions> = this.actionsSubject
    .asObservable()
    .pipe(delay(0));
  // state
  private readonly stateSubject: BehaviorSubject<Game> =
    new BehaviorSubject<Game>(this.initialGameState);
  readonly state$: Observable<Game> = this.stateSubject
    .asObservable()
    .pipe(delay(0));

  readonly frames$: Observable<Frame[]> = this.state$.pipe(
    map((state: Game) => state.frames),
    distinctUntilChanged()
  );
  readonly pinsToKnockDown$: Observable<number> = this.state$.pipe(
    map((state: Game) => {
      if (!!!state.firstRoll) {
        return 10;
      }
      if (!!!state.secondRoll) {
        return 10 - state.firstRoll;
      }
      return 0;
    }),
    distinctUntilChanged()
  );

  readonly currentFrameIndex$: Observable<number> = this.state$.pipe(
    map((state: Game) => state.frames.length),
    distinctUntilChanged()
  );

  constructor() {
    this.handleReducers();
    this.handleEffects().subscribe((action: BowlingActions | null) => {
      if (action) {
        this.actionsSubject.next(action);
      }
    });
  }

  private handleReducers(): void {
    this.actions$.pipe(this.untilDestroyed()).subscribe((action) => {
      if (action) {
        switch (action.type) {
          case GameActionsType.RESET:
          case GameActionsType.START:
            this.stateSubject.next({
              firstRoll: null,
              secondRoll: null,
              thirdRoll: null,
              frames: [],
            });
            break;
          case GameActionsType.NEW_FRAME:
            const newFrameIndex = this.stateSubject.value.frames.length + 1;
            const newFrame: Frame = {
              id: newFrameIndex,
              rolls: [],
              score: 0,
              bonus: null,
            };

            this.stateSubject.next({
              firstRoll: null,
              secondRoll: null,
              thirdRoll: null,
              frames: [...this.stateSubject.value.frames, newFrame],
            });
            break;

          case GameActionsType.STORE_ROLL:
            const lastFrameIndex = Object.keys(
              this.stateSubject.value.frames
            ).length;
            let lastFrame = this.stateSubject.value.frames[lastFrameIndex];
            lastFrame = roll(lastFrame, action.pinsKnocked);
            this.stateSubject.next({
              firstRoll: lastFrame.rolls[0] ?? null,
              secondRoll: lastFrame.rolls[1] ?? null,
              thirdRoll: null,
              frames: [...this.stateSubject.value.frames, lastFrame],
            });
            break;
          default:
            break;
        }
      }
    });
  }

  private handleEffects(): Observable<BowlingActions | null> {
    return this.actions$.pipe(
      delay(14), // to make sure effect comes after reducer, simulate backend call
      this.untilDestroyed(),
      tap((action: BowlingActions) => console.log(action)),
      concatMap((action: BowlingActions) => {
        switch (action.type) {
          case GameActionsType.ROLL:
            return this.state$.pipe(
              take(1),
              map((state: Game) => {
                const { firstRoll, secondRoll } = this.stateSubject.value;
                let pinsKnocked = 0;
                if (!!!firstRoll) {
                  pinsKnocked = Math.floor(Math.random() * 10 + 1);
                  return new StoreRollAction(pinsKnocked);
                }
                if (!!!secondRoll && firstRoll < 10) {
                  pinsKnocked = random(10, firstRoll);
                  return new StoreRollAction(pinsKnocked);
                }

                return new NewFrameAction();
              })
            );
          case GameActionsType.NEW_FRAME:
            const pinsKnocked = Math.floor(Math.random() * 10 + 1);
            return of(new StoreRollAction(pinsKnocked));
          default:
            return of(null);
        }
      })
    );
  }

  handleStart(): void {
    this.actionsSubject.next(new StartAction());
  }

  handleNewFrame(): void {
    this.actionsSubject.next(new NewFrameAction());
  }

  handleRoll(): void {
    // this.actionsSubject.next(new RollAction());
  }
}
