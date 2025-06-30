import { Store } from './types.js'

/*
  super simple key-value store using IndexedDB
*/

const req = <T>(r: IDBRequest<T>) =>
  new Promise<T>((resolve, reject) => {
    r.onsuccess = () => resolve(r.result)
    r.onerror = () => reject(r.error)
  })

const openDb = (storeName: string): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const open = indexedDB.open(storeName, 1)

    // first time we open *this* db 
    open.onupgradeneeded = () => open.result.createObjectStore('kv')

    open.onerror = () => reject(open.error)
    open.onsuccess = () => resolve(open.result)
  })

const tx = <T>(
  db: IDBDatabase,
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T>
) => req(fn(db.transaction('kv', mode).objectStore('kv')))

export const createStore = async <Id extends string = string, Value = any>(
  storeName: string
) => {
  const db = await openDb(storeName)

  const store: Store<Id, Value> = {
    keys: () => tx(db, 'readonly', s => s.getAllKeys()) as Promise<any[]>,
    values: () => tx(db, 'readonly', s => s.getAll()) as Promise<any[]>,
    get: id => tx(db, 'readonly', s => s.get(id)),
    has: id => tx(db, 'readonly', s => s.count(id)).then(c => c > 0),
    set: (id, v) => tx(db, 'readwrite', s => s.put(v, id)).then(() => { }),
    delete: id => tx(db, 'readwrite', s => s.delete(id)).then(() => { })
  }

  return store
}
