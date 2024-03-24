
export type BowlingAction<Action, Props = {}> = {
  type: Action;
} & Props;
export enum BowlingActionsType {
  START = '[GAME] Start',
  RESET = '[GAME] Reset',
  ROLL = '[GAME] Roll',
  STORE_ROLL = '[GAME] STORE ROLL',
  NEW_FRAME = '[GAME] New frame',
  UPDATE_SCORE = '[GAME] Update total score',
}

export class StartAction implements BowlingAction<BowlingActionsType.START> {
  readonly type = BowlingActionsType.START;
}

export class ResetAction implements BowlingAction<BowlingActionsType.RESET> {
  readonly type = BowlingActionsType.RESET;
}

export class RollAction implements BowlingAction<BowlingActionsType.ROLL> {
  readonly type = BowlingActionsType.ROLL;
}
export class NewFrameAction
  implements BowlingAction<BowlingActionsType.NEW_FRAME>
{
  readonly type = BowlingActionsType.NEW_FRAME;
}

export class StoreRollAction
  implements BowlingAction<BowlingActionsType.STORE_ROLL, { pinsKnocked: number }>
{
  readonly type = BowlingActionsType.STORE_ROLL;
  constructor(public pinsKnocked: number) {}
}

export class UpdateScoreAction
  implements
    BowlingAction<
      BowlingActionsType.UPDATE_SCORE,
      { score: number; frameIndex: number }
    >
{
  readonly type = BowlingActionsType.UPDATE_SCORE;
  constructor(public score: number, public frameIndex: number) {}
}

export type BowlingActions =
  | NewFrameAction
  | ResetAction
  | RollAction
  | StartAction
  | StoreRollAction
  | UpdateScoreAction;
