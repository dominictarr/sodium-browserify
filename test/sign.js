
Buffer = require('buffer/').Buffer
var tape = require('tape')
var data = require('./data').sign
var inputs = require('./data').inputs

module.exports = function (sodium) {

  var keys = sodium.crypto_sign_seed_keypair(data.seed)

  tape('crypto_sign_seed_keypair', function (t) {

    t.deepEqual(keys.publicKey, data.publicKey)
    t.deepEqual(keys.secretKey, data.secretKey)
    t.end()

  })

  inputs.forEach(function (msg, i) {
    tape('verify_detached: ' + msg, function (t) {
      console.log([data.sign_detached[i], msg, data.publicKey].map(function (s) {return s.toString('base64')}))
      console.log('verify', sodium.crypto_sign_verify_detached(data.sign_detached[i], msg, data.publicKey))
      t.ok(sodium.crypto_sign_verify_detached(data.sign_detached[i], msg, data.publicKey))
      t.end()
    })

    tape('sign_detached', function (t) {
      t.deepEqual(sodium.crypto_sign_detached(msg, data.secretKey), data.sign_detached[i])
      t.end()
    })

    tape('sign', function (t) {
      t.deepEqual(sodium.crypto_sign(msg, data.secretKey), data.sign[i])
      t.end()
    })

    tape('sign_open', function (t) {
      t.deepEqual(sodium.crypto_sign_open(data.sign[i], data.publicKey), msg)
      t.end()
    })
  })
}

if(!module.parent)
  module.exports(require('../browser'))
