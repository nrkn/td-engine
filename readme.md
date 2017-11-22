# td-engine

A JavaScript engine for building tower defense games in the browser

Requires a browser that supports [import/export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import),
eg Chrome, or Firefox with `dom.moduleScripts.enabled` in `about:config`

Currently at early prototype stage

![screenshot](screenshot.png)

## TODO

### short term

- towers aim ahead of creeps
- killing creeps earns money
- place towers
- upgrade towers
- creeps come in waves
- pause
- load and save
- level progression

### mid term

- add more tower types
- add more creep types

### long term

- difficulty
- test on slower machine and optimize
- allow multiple paths through map
- allow levels with no predefined paths, creeps pathfind from start to exit
- levels with tower slots ala Kingdom Rush
- offensive units ala Kingdom Rush
- levels where towers block path and creeps attack towers ala Plants vs Zombies

### maybe

- pixi.js client - svg is easier eg click events on elements
  but pixi.js is much faster
