'use strict'
const getData = require('./db')
const express = require('express')
const { ExpressPrometheusMiddleware } = require('@matteodisabatino/express-prometheus-middleware')
const app = express()
const epm = new ExpressPrometheusMiddleware()
const port = process.env.PORT || 3002
app.use(epm.handler)

// Main API
app.get('/', (req, res, next) => {
  setTimeout(() => {
    res.json({ message: 'This is service from NodeJS' })
    next()
  }, Math.round(Math.random() * 200))
})

app.get('/call-db', async (req, res, next) => {
  await getData();
  res.json({ message: 'Called database' })
  next()
})

app.get('/steps', (req, res, next) => {
  const span = opentelemetry.trace.getActiveSpan();
  span.addEvent('Steps API called');
  step1()
  setTimeout(() => {
    res.json({ message: 'This is service from NodeJS' })
    next()
  }, Math.round(Math.random() * 200))
})

const step1 = () => {
  const span = opentelemetry.trace.getActiveSpan();
  span.addEvent('Step 1 called');
  setTimeout(() => {
    console.log('Step 2')
  }, Math.round(Math.random() * 200))
  step2()
}

const step2 = () => {
  const span = opentelemetry.trace.getActiveSpan();
  span.addEvent('Step 2 called');
  setTimeout(() => {
    console.log('Step 2')
  }, Math.round(Math.random() * 200))
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

process.on('SIGTERM', () => {
  clearInterval(metricsInterval)
  process.exit(0)
})