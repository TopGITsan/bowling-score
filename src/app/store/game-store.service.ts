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
  tap,
} from 'rxjs';
import { Frame } from '../model/frame.model';
import { Bowling } from '../model/game.model';
import { untilDestroyed } from '../utils/app.helper';
import {
  BowlingActions,
  GameActionsType,
  NewFrameAction,
  StartAction,
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
  }

  private handleReducers(): void {
    this.actions$.pipe(this.untilDestroyed()).subscribe((action) => {
      if (action) {
        switch (action.type) {
          case GameActionsType.RESET:
          case GameActionsType.START:
            this.stateSubject.next({ ...this.initialGameState });
            break;
          case GameActionsType.NEW_FRAME:
            // TODO
            break;
          case GameActionsType.STORE_ROLL:
            // TODO
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
      tap((action: BowlingActions) => console.log(action)),
      concatMap((action: BowlingActions) => {
        switch (action.type) {
          case GameActionsType.ROLL:
            // TODO
            // return this.state$.pipe(
            //   take(1),
            //   map((state: Bowling) => {
            //     const { firstRoll, secondRoll } = this.stateSubject.value;
            //     let pinsKnocked = 0;
            //     if (!!!firstRoll) {
            //       pinsKnocked = Math.floor(Math.random() * 10 + 1);
            //       return new StoreRollAction(pinsKnocked);
            //     }
            //     if (!!!secondRoll && firstRoll < 10) {
            //       pinsKnocked = random(10, firstRoll);
            //       return new StoreRollAction(pinsKnocked);
            //     }

            //     return new NewFrameAction();
            //   })
            // );
          case GameActionsType.NEW_FRAME:
            // TODO
            // const pinsKnocked = Math.floor(Math.random() * 10 + 1);
            // return of(new StoreRollAction(pinsKnocked));
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
