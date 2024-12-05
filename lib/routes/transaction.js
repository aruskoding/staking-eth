var express = require('express')
var router = express.Router()
var { broadcast } = require('./../controller/transaction')
// const SlashingMonitor = require('../subscription/slashing')

router.use(function timeLog(req, res, next) {
  req.txRequest = req.body && req.body.payload
  if (req.txRequest) {
    console.log(`Transaction ${Date.now()} ${req.txRequest.messageType}`)
  } 
  next()
})

router.use('/hello', (req, res) => {
  res.json({ message: 'Hello, world! coba' })
})

router.use('/broadcast', async function (req, res) {
  const response = await broadcast(
    req.txRequest,
    req.headers.fingerprint || false,
    req.headers.development === 'true'
  )
  // console.log('response', response)
  res.json(response)
})

module.exports = router
