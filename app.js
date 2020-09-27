const express = require('express')
const bodyParser = require('body-parser')
const data = require('./data.json')
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min) + min)
}

function getRandomFeedList () {
  const list = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4]
  for (let i = 0; i < 1000; i++) {
    const x = getRandomInt(0, 8)
    const y = x + 1;
    [list[x], list[y % 8]] = [list[y % 8], list[x]]
  }
  return list
}

function passAuthentication (user, password) {
  return user === 'buyer' && password === 'password'
}

app.post('/api/auth', (req, res) => {
  const { user, password } = req.body

  if (passAuthentication(user, password)) {
    res.status(200).end()
    return
  }
  res.status(404).json('Invalid user or password').end()
})

app.get('/api/feeds', (_req, res) => {
  const list = getRandomFeedList()
  res.status(200).json(list)
})

app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (id < 0 || id > 4) { return res.status(404).end() }

  res.status(200).json(data[id]).end()
})

const server = app.listen(3000, () => {
  console.log('Start backend service')
})

module.exports = server
