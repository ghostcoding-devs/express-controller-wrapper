const routes = require('express').Router()
const axios = require('axios')
const controllerUtil  = require('../lib')

module.exports = () => {

  /* 
     Typical syntax for passing errors to the error handle middleware in an express controller function
     Way too much boilerplate that you will keep on repeating in every controller you write.
  */

  routes.get('/', async (_req, res, next) => {
    try {
      const requestData = (await axios.get('https://jsonplaceholder.typicode.com/todos/1')).data
      return res.json({...requestData})
    } catch(err) {
      next(err)
    }
  })

  /* 
     So lets get rid of that boilerplate by wrapping the controller function inside the controllerUtil function
  */
  routes.get('/error', controllerUtil(async (_req, res) => {
    const requestData = (await axios.get('https://jsonplaceholder.typicode.com/todos/a')).data
    return res.json({...requestData})
  }))

  return routes
}
