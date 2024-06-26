import {
  Frame,
  hasFrameSpare,
  hasFrameStrike,
  isFrameDone,
  isLastFrameDone,
  setFrameRoll,
} from './frame.model';

export interface Bowling {
  rolls: number[];
  frames: Frame[];
  maxFrames: number;
  maxPins: number;
  maxAttempsPerFrame: number;
  currentFrameIndex: number;
  strikeCounter: number;
  totalScore: number;
}

export function getCurrentFrame(game: Bowling): Frame | undefined {
  return game.frames.at(game.currentFrameIndex);
}

export function getPreviousFrame(game: Bowling): Frame | undefined {
  return game.frames.at(game.currentFrameIndex - 1);
}

export function isLastFrame(game: Bowling): boolean {
  return game.currentFrameIndex === game.maxFrames -1;
}

// TODO: there is no bonus frame , only added rolls in last frame
export function isBonusFrame(game: Bowling): boolean {
  return game.frames.length > game.maxFrames;
}

export function isAllStrikes(game: Bowling): boolean {
  return game.strikeCounter === game.maxFrames;
}

export function moveToNextFrame(game: Bowling): Bowling {
  let frame = getCurrentFrame(game);

  if (!frame) {
    return game;
  }

  if (!isFrameDone(frame)) {
    return game;
  }

  if (isLastFrame(game)) {
    return game;
  }

  return {
    ...game,
    strikeCounter: hasFrameStrike(frame)
      ? game.strikeCounter + 1
      : game.strikeCounter,
    currentFrameIndex: game.currentFrameIndex + 1,
    frames: [...game.frames],
  };
}

export function setFrameRollInGame(
  game: Bowling,
  pinsKnocked: number
): Bowling {
  let frame = getCurrentFrame(game);

  if (!frame) {
    return game;
  }

  if (isFrameDone(frame) && !isLastFrame(game)) {
    return game;
  }

  if (isLastFrame(game) && isLastFrameDone(frame)) {
    return game;
  }

  frame = setFrameRoll(frame, pinsKnocked);
  const frames = game.frames;
  frames[game.currentFrameIndex] = frame;
  return {
    ...game,
    rolls: [...game.rolls, pinsKnocked],
    frames: [...frames],
  };
}

export function setFrameScoreInGame(
  game: Bowling,
  score: number,
  frameIndex: number
): Bowling {
  let frame = game.frames.at(frameIndex);

  if (!frame) {
    return game;
  }

  frame.totalScore = score;
  const frames = game.frames;
  frames[frameIndex] = frame;
  return {
    ...game,
    frames: [...frames],
  };
}

export function sumOfBallsInFrame(game: Bowling, index: number): number {
  return game.frames.at(index)?.score ?? 0;
}

export function spareBonus(game: Bowling, index: number): number {
  return game.rolls.at(index + 2) ?? 0;
}

export function strikeBonus(game: Bowling, index: number): number {
  return (game.rolls.at(index + 1) ?? 0) + (game.rolls.at(index + 2) ?? 0);
}

export function calculateScore(game: Bowling, gameLength: number): number {
  let score: number = 0;
  let rollIndex: number = 0;
  for (let frameIndex = 0; frameIndex <= gameLength; frameIndex++) {
    if (hasFrameStrike(game.frames.at(frameIndex))) {
      score += 10 + +strikeBonus(game, rollIndex);
      rollIndex++;
    } else if (hasFrameSpare(game.frames.at(frameIndex))) {
      score += 10 + +spareBonus(game, rollIndex);
      rollIndex += 2;
    } else {
      score += sumOfBallsInFrame(game, frameIndex) ?? 0;
      rollIndex += 2;
    }
  }
  return score;
}
