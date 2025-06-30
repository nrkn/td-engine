import { Maybe } from '../types.js'

export type Store<Id, Value> = {
  keys: () => Promise<Id[]>
  values: () => Promise<Value[]>
  get: (id: Id) => Promise<Maybe<Value>>
  has: (id: Id) => Promise<boolean>
  set: (id: Id, value: Value) => Promise<void>
  delete: (id: Id) => Promise<void>
}
