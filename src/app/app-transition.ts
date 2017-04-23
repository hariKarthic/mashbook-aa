import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// Component transition animations
export const fadeOutRoute: AnimationEntryMetadata =
  trigger('routeAnimation', [
    state('*',
      style({
        // display: 'inline-block',
        opacity: 1
      })
    ),
    transition(':leave', [
      animate('.5s', style({
        opacity: 0
      }))
    ])
  ]);
