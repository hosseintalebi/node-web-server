const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
const app = express()

// register partials
hbs.registerPartials(__dirname + '/views/partials')

// register helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.set('view engine', 'hbs')

// middlewares
// middleware for using static contents
app.use(express.static(__dirname + '/public'))

// custom middleware
app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })

  // tells application that middleware is done
  // without calling next nothing after this won't be executed
  next()
})

// Serving different routes
app.get('/', (req, res) => {
  // res.send('<div><h1>Hello Express</h1></div>')
  // res.send({
  //   name: 'Hoss',
  //   likes: [
  //     'bouldering',
  //     'programming',
  //   ]
  // })
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to this page',
  })
})

app.get('/about', (req, res) => {
  // res.send('About page')

  // view directory is the default folder for templates that express look for
  // that's why we don't specify the dir in the below render call
  res.render('about.hbs', {
    pageTitle: 'About Page',
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'unable to handle request'
  })
})

app.listen(port, () => {
  console.log(`server is up on localhost:${port}`)
})
