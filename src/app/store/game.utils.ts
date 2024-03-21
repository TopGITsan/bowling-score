import { Frame } from "../model/frame.model";

export function roll(frame: Frame, pinsKnocked: number): Frame {
  if (frame.rolls.length > 0) {
    let updatedFrame = checkIsSpare(frame);
    updatedFrame = storeRoll(frame, pinsKnocked);
    return updatedFrame;
  }

  let updatedFrame = storeRoll(frame, pinsKnocked);
  if (pinsKnocked !== 10) {
    return updatedFrame;
  }

  return { ...updatedFrame, bonus: 'strike' };
}

export function checkIsSpare(frame: Frame): Frame {
  if (frame.score === 10 && frame.rolls[0] < 10) {
    return { ...frame, bonus: 'spare' };
  }
  return frame;
}

export function storeRoll(frame: Frame, pinsKnocked: number): Frame {
  return {
    ...frame,
    rolls: [...frame.rolls, pinsKnocked],
    score: frame.score + pinsKnocked,
  };
}

