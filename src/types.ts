export type Action = () => Promise<void>

export type Scene = {
  start: Action
  stop: Action
}
