import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// Component transition animations
export const fadeInAnimation: AnimationEntryMetadata =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1
      })
    ),
    transition(':leave', [
      animate('.5s', style({
        opacity: 0
      }))
    ])
  ]);
