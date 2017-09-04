const express = require('express')

const app = express()

app.get('/', (req, res) => {
  // res.send('<div><h1>Hello Express</h1></div>')
  res.send({
    name: 'Hoss',
    likes: [
      'bouldering',
      'programming',
    ]
  })
})

app.get('/about', (req, res) => {
  res.send('About page')
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'unable to handle request'
  })
})

app.listen(3000)
