import { InjectionToken } from '@angular/core';
import { Notyf } from 'notyf';

export const NOTYF = new InjectionToken<Notyf>('NotyfToken');

export function notyfFactory(): Notyf {
  return new Notyf({
    duration: 5000,
    types: [
        {
          type: 'error',
          background: 'indianred',
          duration: 0,
          dismissible: true
        }
      ]
  });
}