export type Bonus = 'strike' | 'spare' | null;
export interface Frame {
  rolls: number[];
  score: number;
  bonus: Bonus;
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

export function isFrameDone(frame: Frame | undefined): boolean {
  return (
    frame?.rolls.length === 2 ||
    (frame?.rolls.at(0) ?? 0) + (frame?.rolls.at(1) ?? 0) === 10
  );
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

  if (frame.rolls.length === 1) {
    return {
      ...frame,
      rolls: [...frame.rolls, pinsKnocked],
      score: frame.score + pinsKnocked,
    };
  }

  return {
    ...frame,
    rolls: [pinsKnocked],
    score: frame.score + pinsKnocked,
  };
}

export function getFrameFirstRoll(frame: Frame): number | undefined {
  return frame.rolls.at(0);
}

export function getFrameSecondRoll(frame: Frame): number | undefined {
  return frame.rolls.at(1);
}
