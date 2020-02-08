const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { expect } = chai
chai.use(sinonChai)

const controllerUtil = require('./lib')

describe('controllerUtil', () => {

  it('should catch exceptions of the wrapped function', async () => {
    const error = new Error('I will break your app')
    const tester = controllerUtil(() => {
      throw error
    })
    expect(tester).to.throw(error)
  })

  it('should work with non-async functions', async () => {
    const next = sinon.spy()
    const tester = controllerUtil((req, res, next) => {
      next()
    })

    await tester(null, null, next)
    expect(next).to.have.been.calledWith()
  })

  it('should call next with the error when the passed in function throws an error', async () => {
    const error = new Error('catch me!')
    const next = sinon.spy();
    const tester = controllerUtil(async (req, res, next) => {
      throw error
    })

    await tester(null, null, next)
    expect(next).to.have.been.calledWith(error)
  })

  it('should call next with the arguments passed to it', async () => {
    const next = sinon.spy()
    const tester = controllerUtil(async (req, res, next) => {
      next('testValue')
    })

    await tester(null, null, next)
    expect(next).to.have.been.calledWith('testValue')
  })

  it('should not call next when no error occurs', async () => {
    const next = sinon.spy()
    const mainFn = sinon.spy()
    const tester = controllerUtil(async () => {
      if(1 === 2) throw error
      mainFn()
    })

    await tester(null, null, next)
    expect(mainFn).to.have.been.called
    expect(next).not.to.have.been.called

  })

})