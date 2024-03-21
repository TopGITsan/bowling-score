import { Frame } from '../model/frame.model';

export type BowlingAction<Action, Props = {}> = {
  type: Action;
} & Props;
export enum GameActionsType {
  START = '[GAME] Start',
  ROLL = '[GAME] Roll',
  RESET = '[GAME] Reset',
  NEW_FRAME = '[GAME] New frame',
  STORE_ROLL = '[GAME] STORE ROLL',
  SPARE = '[GAME] Spare',
  SRIKE = '[GAME] Strike',
}

export class StartAction implements BowlingAction<GameActionsType.START> {
  readonly type = GameActionsType.START;
}

export class ResetAction implements BowlingAction<GameActionsType.RESET> {
  readonly type = GameActionsType.RESET;
}

export class RollAction
  implements BowlingAction<GameActionsType.ROLL>
{
  readonly type = GameActionsType.ROLL;
}
export class NewFrameAction
  implements BowlingAction<GameActionsType.NEW_FRAME>
{
  readonly type = GameActionsType.NEW_FRAME;
}

export class StoreRollAction
  implements BowlingAction<GameActionsType.STORE_ROLL, { pinsKnocked: number }>
{
  readonly type = GameActionsType.STORE_ROLL;
  constructor(public pinsKnocked: number) {}
}

export type BowlingActions =
  | StartAction
  | RollAction
  | NewFrameAction
  | StoreRollAction
  | ResetAction;
