const controllerUtil = fn => (...args) => {
  const mainFn = fn(...args)
  const nextFn = args.find(f => typeof f === 'function')
  return Promise.resolve(mainFn).catch(nextFn)
}

module.exports = controllerUtil
