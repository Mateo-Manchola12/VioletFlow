import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const formErrorAnimations = [
  trigger('expandCollapse', [
    transition(':enter', [
      style({ height: 0, opacity: 0, transform: 'translateY(-10px)' }),
      animate('250ms ease-out', style({
        height: '*',
        opacity: 1,
        transform: 'translateY(0)'
      })),
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({
        height: 0,
        opacity: 0,
        transform: 'translateY(-10px)'
      })),
    ]),
  ]),

  trigger('showError', [
    state('visible', style({
      opacity: 1,
      transform: 'translateY(0)',
      height: '*'
    })),
    state('hidden', style({
      opacity: 0,
      transform: 'translateY(-5px)',
      height: 0
    })),
    transition('hidden => visible', [
      style({ opacity: 0, transform: 'translateY(-5px)', height: 0 }),
      animate('200ms ease-out', style({
        opacity: 1,
        transform: 'translateY(0)',
        height: '*'
      })),
    ]),
    transition('visible => hidden', [
      animate('150ms ease-in', style({
        opacity: 0,
        transform: 'translateY(-5px)',
        height: 0
      })),
    ]),
  ]),
];
