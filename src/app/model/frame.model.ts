export type Bonus = 'strike' | 'spare' | null;
export interface Frame {
  rolls: number[];
  score: number;
  bonus: Bonus;
  totalScore: number;
}

export function hasFrameSpare(frame: Frame | undefined): boolean {
  return (
    (frame?.rolls?.at(0) ?? 0) + (frame?.rolls.at(1) ?? 0) === 10 &&
    (frame?.rolls?.at(0) ?? 101) < 10
  );
}

export function hasFrameStrike(frame: Frame | undefined): boolean {
  return (frame?.rolls?.at(0) ?? 0) === 10;
}
// TODO: check if last frame &&  check for strike or spare. last frame can have 3 rolls.
export function isFrameDone(frame: Frame | undefined): boolean {
  return (
    frame?.rolls.length === 2 ||
    (frame?.rolls.at(0) ?? 0) + (frame?.rolls.at(1) ?? 0) === 10
  );
}

export function isLastFrameDone(frame: Frame | undefined): boolean {
  if (frame?.rolls.length === 2 && !hasFrameSpare(frame)) {
    return true;
  }
  if (
    frame?.rolls.length === 3 &&
    (hasFrameStrike(frame) || hasFrameSpare(frame))
  ) {
    return true;
  }

  return false;
}

export function setFrameScore(frame: Frame, score: number): Frame {
  return {
    ...frame,
    score: score,
  };
}

export function setFrameRoll(frame: Frame, pinsKnocked: number): Frame {
  if (frame.rolls.length === 0 && pinsKnocked === 10) {
    return {
      ...frame,
      rolls: [...frame.rolls, pinsKnocked],
      score: frame.score + pinsKnocked,
      bonus: 'strike',
    };
  }

  if (frame.rolls.length === 1 && pinsKnocked + frame.rolls[0] === 10) {
    return {
      ...frame,
      rolls: [...frame.rolls, pinsKnocked],
      score: frame.score + pinsKnocked,
      bonus: 'spare',
    };
  }

  return {
    ...frame,
    rolls: [...frame.rolls, pinsKnocked],
    score: frame.score + pinsKnocked,
  };
}

export function getFrameFirstRoll(frame: Frame): number | undefined {
  return frame.rolls.at(0);
}

export function getFrameSecondRoll(frame: Frame): number | undefined {
  return frame.rolls.at(1);
}
