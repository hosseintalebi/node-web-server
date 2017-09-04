const express = require('express')
const hbs = require('hbs')

const app = express()

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.set('view engine', 'hbs')
// use middleware
app.use(express.static(__dirname + '/public'))

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

app.listen(3000, () => {
  console.log('server is up on localhost:3000')
})
