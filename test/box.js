
Buffer = require('buffer/').Buffer
var data = require('./data').box
var inputs = require('./data').inputs
var tape = require('tape')

module.exports = function (sodium) {

  tape('scalar mult', function (t) {
    t.deepEqual(
      sodium.crypto_scalarmult(data.alice_secretKey, data.bob_publicKey),
      data.scalarmult
    )
    t.deepEqual(
      sodium.crypto_scalarmult(data.bob_secretKey, data.alice_publicKey),
      data.scalarmult
    )
    t.end()
  })

  inputs.forEach(function (msg, i) {
    var name = msg.toString().substring(0, 20)
    tape('box:' + name, function (t) {

      console.log([msg, data.nonce, data.bob_publicKey, data.alice_secretKey])

      t.deepEqual(
        sodium.crypto_box_easy(msg, data.nonce, data.bob_publicKey, data.alice_secretKey),
        data.box_easy[i]
      )

      t.deepEqual(
        sodium.crypto_box_open_easy(data.box_easy[i], data.nonce, data.bob_publicKey, data.alice_secretKey),
        msg
      )


      t.end()

    })
  })
}

if(!module.parent)
  module.exports(require('../browser'))
