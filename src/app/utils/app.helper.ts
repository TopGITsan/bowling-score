import { DestroyRef, inject } from '@angular/core';
import { MonoTypeOperatorFunction, Subject, takeUntil } from 'rxjs';

export function untilDestroyed(): <T>() => MonoTypeOperatorFunction<T> {
  const subject = new Subject();

  inject(DestroyRef).onDestroy(() => {
    subject.next(true);
    subject.complete();
  });

  return <T>() => takeUntil<T>(subject.asObservable());
}

export const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;
