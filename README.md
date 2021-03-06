# Gc-Express-controller-wrapper

This little library automatically wraps your controller functions into a try catch block and calls the next function when an error occurs with the thrown error data.


### Installation

```
npm install gc-express-controller-wrapper
```

### Usage


```javascript

  routes.get('/error', controllerUtil(async (_req, res) => {
    const requestData = (await axios.get('https://jsonplaceholder.typicode.com/todos/a')).data
    return res.json({...requestData})
  }))

```

### Usage without express-controller-wrapper


```javascript

  routes.get('/', async (_req, res, next) => {
    try {
      const requestData = (await axios.get('https://jsonplaceholder.typicode.com/todos/1')).data
      return res.json({...requestData})
    } catch(err) {
      next(err)
    }
  })

```
