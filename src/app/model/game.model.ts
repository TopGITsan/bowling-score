import {
  Frame,
  hasFrameSpare,
  hasFrameStrike,
  isFrameDone,
} from './frame.model';

export interface Bowling {
  rolls: number[];
  frames: Frame[];
  maxFrames: number;
  maxPins: number;
  maxAttempsPerFrame: number;
  currentFrame: number;
  strikeCounter: number;
  totalScore: number;
}

export function getCurrentFrame(game: Bowling): Frame | undefined {
  return game.frames.at(game.currentFrame);
}

export function getPreviousFrame(game: Bowling): Frame | undefined {
  return game.frames.at(game.currentFrame - 1);
}

export function isLastFrame(game: Bowling): boolean {
  return game.currentFrame === game.maxFrames;
}

export function isBonusFrame(game: Bowling): boolean {
  return game.frames.length > game.maxFrames;
}

export function isAllStrikes(game: Bowling): boolean {
  return game.strikeCounter === game.maxFrames;
}

export function sumOfBallsInFrame(game:Bowling, index: number): number | undefined {
  return game.frames.at(index)?.score;
}

export function spareBonus(game:Bowling, index: number): number {
  return game.rolls[index + 1];
}

export function strikeBonus(game:Bowling, index: number): number {
  return game.rolls[index + 1] + game.rolls[index + 2];
}

export function checkAndUpdateGameWithBonusFrame(
  game: Bowling
): Bowling | undefined {
  let frame = getCurrentFrame(game);

  if (!frame) {
    return;
  }

  if (!isLastFrame(game)) {
    return;
  }
  if (!hasFrameSpare(frame) || !hasFrameStrike(frame)) {
    return;
  }
  // add bonus frame
  return {
    ...game,
    currentFrame: game.currentFrame + 1,
    frames: [
      ...game.frames,
      {
        rolls: [],
        score: 0,
        bonus: null,
      },
    ],
  };
}

export function moveToNextFrame(game: Bowling): Bowling | undefined {
  let frame = getCurrentFrame(game);

  if (!frame) {
    return;
  }

  if (!isFrameDone(frame)) {
    return;
  }

  if (isBonusFrame(game)) {
    return;
  }

  if (isLastFrame(game)) {
    return checkAndUpdateGameWithBonusFrame(game);
  }

  if (game.currentFrame === game.maxFrames) {
    return;
  }

  return {
    ...game,
    strikeCounter: hasFrameStrike(frame)
      ? game.strikeCounter + 1
      : game.strikeCounter,
    currentFrame: game.currentFrame + 1,
    frames: [...game.frames],
  };
}

export function calculateScore(game: Bowling): number {
  let score: number = 0;
  let rollIndex: number = 0;
  for (let frameIndex = 0; frameIndex < 10; frameIndex++) {
    if (hasFrameStrike(game.frames.at(frameIndex))) {
      score += 10 + strikeBonus(game,rollIndex);
      rollIndex++;
    } else if (hasFrameSpare(game.frames.at(frameIndex))) {
      score += 10 + spareBonus(game,rollIndex);
      rollIndex += 2;
    } else {
      score += sumOfBallsInFrame(game,frameIndex) ?? 0;
      rollIndex += 2;
    }
  }
  return score;
}
