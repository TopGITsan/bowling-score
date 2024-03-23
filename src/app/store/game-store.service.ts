import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  asapScheduler,
  concatMap,
  delay,
  distinctUntilChanged,
  map,
  observeOn,
  of,
  queueScheduler,
  take,
  tap,
} from 'rxjs';
import { Frame, getFrameFirstRoll } from '../model/frame.model';
import { Bowling, getCurrentFrame, moveToNextFrame, setFrameRollInGame } from '../model/game.model';
import { random, untilDestroyed } from '../utils/app.helper';
import {
  BowlingActions,
  GameActionsType,
  NewFrameAction,
  RollAction,
  StartAction,
  StoreRollAction,
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
    .pipe(delay(0));
  // state
  private readonly stateSubject: BehaviorSubject<Bowling> =
    new BehaviorSubject<Bowling>(this.initialGameState);
  readonly state$: Observable<Bowling> = this.stateSubject
    .asObservable()
    .pipe(delay(0));

  readonly frames$: Observable<Frame[]> = this.state$.pipe(
    map((state: Bowling) => state.frames),
    distinctUntilChanged()
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
    this.state$.subscribe(state => console.log('State:', state))
  }

  private handleReducers(): void {
    this.actions$
      .pipe(this.untilDestroyed(), observeOn(queueScheduler))
      .subscribe((action) => {
        if (action) {
          switch (action.type) {
            case GameActionsType.RESET:
            // TODO should delete all frames
            case GameActionsType.START:
              // TODO should add empty frames
              this.stateSubject.next({ ...this.initialGameState });
              break;
            case GameActionsType.STORE_ROLL:
              this.stateSubject.next({
                ...setFrameRollInGame(moveToNextFrame(this.stateSubject.value), action.pinsKnocked),
              })
              break;
            // TODO: add action to store the score
            default:
              break;
          }
        }
      });
  }

  private handleEffects(): Observable<BowlingActions | null> {
    return this.actions$.pipe(
      this.untilDestroyed(),
      observeOn(asapScheduler),
      tap((action: BowlingActions) => console.log(action)),
      concatMap((action: BowlingActions) => {
        switch (action.type) {
          case GameActionsType.ROLL:
            return this.state$.pipe(
              take(1),
              map((state: Bowling) => {
                const currentFrame = getCurrentFrame(state);
                if(!currentFrame) {
                  return null;
                }
                let pinsKnocked = 0;
                let firstRoll = getFrameFirstRoll(currentFrame);
                if (!!!getFrameFirstRoll(currentFrame)) {
                  pinsKnocked = random(0, 11);
                  return new StoreRollAction(pinsKnocked);
                }
                if (firstRoll ?? 0  < 10) {
                  pinsKnocked = random(0, 11 - (firstRoll ?? 0));
                  return new StoreRollAction(pinsKnocked);
                }
                pinsKnocked = Math.floor(Math.random() * 10 + 1);
                return new StoreRollAction(pinsKnocked);
              })
            );

          case GameActionsType.STORE_ROLL:
          // TODO calculateScore on each frame
          // iterate all frames
          // TODO call action to store the score on each frame
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
