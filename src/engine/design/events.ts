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