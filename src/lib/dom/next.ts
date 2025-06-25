// allows you to handle function chaining by registering multiple functions
// that take a next argument as their last argument. Each function may 
// call the next function if it doesn't handle the argument.
export const createFunctionChain = () => {
  const handlers: ((...args: any[]) => any | undefined)[] = []

  const registerHandler = ( fn: ( ...args: any ) => any ) => {
    handlers.push(fn)
  }

  const handle = ( ...args: any[] ) => {
    let i = 0

    const next = () => {
      const fn = handlers[i++]

      if (fn) fn(...args, next)
    }

    next()
  }

  return { registerHandler, handle }
}