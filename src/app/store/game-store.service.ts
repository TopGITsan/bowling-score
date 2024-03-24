import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  concatMap,
  distinctUntilChanged,
  from,
  map,
  observeOn,
  of,
  queueScheduler,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs';
import { Frame, getFrameFirstRoll } from '../model/frame.model';
import {
  Bowling,
  calculateScore,
  getCurrentFrame,
  moveToNextFrame,
  setFrameRollInGame,
  setFrameScoreInGame,
} from '../model/game.model';
import { random, untilDestroyed } from '../utils/app.helper';
import {
  BowlingActions,
  BowlingActionsType,
  NewFrameAction,
  RollAction,
  StartAction,
  StoreRollAction,
  UpdateScoreAction,
} from './game.actions';
import { INITIAL_GAME_STATE } from './game.state';

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
    .pipe(observeOn(queueScheduler));
  // state
  private readonly stateSubject: BehaviorSubject<Bowling> =
    new BehaviorSubject<Bowling>(this.initialGameState);
  readonly state$: Observable<Bowling> = this.stateSubject
    .asObservable()
    .pipe(
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    );

  readonly frames$: Observable<Frame[]> = this.state$.pipe(
    map((state: Bowling) => state.frames),
    distinctUntilChanged(
      (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
    )
  );

  readonly currentFrameIndex$: Observable<number> = this.state$.pipe(
    map((state: Bowling) => state.frames.length),
    distinctUntilChanged()
  );

  constructor() {
    this.handleReducers();
    this.handleEffects().subscribe((action: BowlingActions | null) => {
      if (action) {
        this.actionsSubject.next(action);
      }
    });
    // this.state$.pipe(observeOn(asapScheduler)).subscribe((state) => console.log('State:', state));
  }

  private handleReducers(): void {
    this.actions$
      .pipe(this.untilDestroyed())
      .subscribe((action) => {
        if (action) {
          switch (action.type) {
            case BowlingActionsType.RESET:
              // TODO should delete all frames
              break;
            case BowlingActionsType.START:
              // TODO should add empty frames
              break;
            case BowlingActionsType.STORE_ROLL:
              console.log('Reducer: ', action);
              // TODO: separate next frame from set roll, move logic into effect
              this.stateSubject.next({
                ...setFrameRollInGame(
                  moveToNextFrame(this.stateSubject.value),
                  action.pinsKnocked
                ),
              });
              break;
            case BowlingActionsType.UPDATE_SCORE:
              console.log('Reducer: ', action);
              this.stateSubject.next({
                ...setFrameScoreInGame(
                  this.stateSubject.getValue(),
                  action.score,
                  action.frameIndex
                ),
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
      this.untilDestroyed(),
      concatMap((action: BowlingActions) => {
        switch (action.type) {
          case BowlingActionsType.ROLL:
            console.log('Effect: ', action);
            return this.state$.pipe(
              take(1),
              map((state: Bowling) => {
                const currentFrame = getCurrentFrame(state);
                if (!currentFrame) {
                  return null;
                }
                let pinsKnocked = 0;
                let firstRoll = getFrameFirstRoll(currentFrame);
                if (!!!getFrameFirstRoll(currentFrame)) {
                  pinsKnocked = random(0, 11);
                  return new StoreRollAction(pinsKnocked);
                }
                // TODO
                if (firstRoll ?? 0 < 10) {
                  pinsKnocked = random(0, 11 - (firstRoll ?? 0));
                  return new StoreRollAction(pinsKnocked);
                }
                pinsKnocked = random(0, 11);
                return new StoreRollAction(pinsKnocked);
              })
            );

          case BowlingActionsType.STORE_ROLL:
            console.log('Effect: ', action);
            return this.state$.pipe(
              take(1),
              switchMap((state: Bowling) => {
                const currentFrame = getCurrentFrame(state);
                const currentFrameIndex = state.currentFrameIndex;
                if (!currentFrame) {
                  return of([]);
                }
                return from(
                  Array.from({ length: currentFrameIndex + 1 }, (e, i) => i)
                ).pipe(withLatestFrom(of(state)));
              }),
              map(([gameLength, state]) => {
                if (!state) {
                  return null;
                }
                const score = calculateScore(state, gameLength);
                return new UpdateScoreAction(score, gameLength);
              })
            );
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
    this.actionsSubject.next(new RollAction());
  }
}
