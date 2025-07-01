"use strict";
/*
  we need events and actions to both drive the engine and also to allow replays
  to be recorded and played back (so any randomness must be seeded to make it
  deterministic)

  types of events that can happen in the runtime:

  EVENT -> LISTENERS
  wave start -> UX, log
  wave end -> UX, log
  creep spawn -> UX, log
  creep move -> UX, log
  creep turn -> UX, log
  creep enter tower range -> UX, log, tower
  creep exit tower range -> UX, log, tower
  projectile spawn (aka tower fire) -> UX, log
  creep/projectile collision -> UX, log, creep?, projectile?
  projectile exit (eg leave viewport) -> UX, log
  creep death -> UX, log, creep?
  creep exit -> UX, log, creep?

  nb - not necessarily implemented as capital E events - just thinking about how
  data flows through the engine

  actions that the player can dispatch:

  place tower
  sell tower
  upgrade tower
  next wave
*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2VuZ2luZS9kZXNpZ24vZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBOEJFIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICB3ZSBuZWVkIGV2ZW50cyBhbmQgYWN0aW9ucyB0byBib3RoIGRyaXZlIHRoZSBlbmdpbmUgYW5kIGFsc28gdG8gYWxsb3cgcmVwbGF5c1xyXG4gIHRvIGJlIHJlY29yZGVkIGFuZCBwbGF5ZWQgYmFjayAoc28gYW55IHJhbmRvbW5lc3MgbXVzdCBiZSBzZWVkZWQgdG8gbWFrZSBpdFxyXG4gIGRldGVybWluaXN0aWMpXHJcblxyXG4gIHR5cGVzIG9mIGV2ZW50cyB0aGF0IGNhbiBoYXBwZW4gaW4gdGhlIHJ1bnRpbWU6XHJcblxyXG4gIEVWRU5UIC0+IExJU1RFTkVSU1xyXG4gIHdhdmUgc3RhcnQgLT4gVVgsIGxvZ1xyXG4gIHdhdmUgZW5kIC0+IFVYLCBsb2dcclxuICBjcmVlcCBzcGF3biAtPiBVWCwgbG9nXHJcbiAgY3JlZXAgbW92ZSAtPiBVWCwgbG9nXHJcbiAgY3JlZXAgdHVybiAtPiBVWCwgbG9nXHJcbiAgY3JlZXAgZW50ZXIgdG93ZXIgcmFuZ2UgLT4gVVgsIGxvZywgdG93ZXJcclxuICBjcmVlcCBleGl0IHRvd2VyIHJhbmdlIC0+IFVYLCBsb2csIHRvd2VyXHJcbiAgcHJvamVjdGlsZSBzcGF3biAoYWthIHRvd2VyIGZpcmUpIC0+IFVYLCBsb2dcclxuICBjcmVlcC9wcm9qZWN0aWxlIGNvbGxpc2lvbiAtPiBVWCwgbG9nLCBjcmVlcD8sIHByb2plY3RpbGU/XHJcbiAgcHJvamVjdGlsZSBleGl0IChlZyBsZWF2ZSB2aWV3cG9ydCkgLT4gVVgsIGxvZ1xyXG4gIGNyZWVwIGRlYXRoIC0+IFVYLCBsb2csIGNyZWVwP1xyXG4gIGNyZWVwIGV4aXQgLT4gVVgsIGxvZywgY3JlZXA/XHJcblxyXG4gIG5iIC0gbm90IG5lY2Vzc2FyaWx5IGltcGxlbWVudGVkIGFzIGNhcGl0YWwgRSBldmVudHMgLSBqdXN0IHRoaW5raW5nIGFib3V0IGhvd1xyXG4gIGRhdGEgZmxvd3MgdGhyb3VnaCB0aGUgZW5naW5lXHJcblxyXG4gIGFjdGlvbnMgdGhhdCB0aGUgcGxheWVyIGNhbiBkaXNwYXRjaDpcclxuXHJcbiAgcGxhY2UgdG93ZXJcclxuICBzZWxsIHRvd2VyXHJcbiAgdXBncmFkZSB0b3dlclxyXG4gIG5leHQgd2F2ZVxyXG4qLyJdfQ==