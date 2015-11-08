
Buffer = require('buffer/').Buffer
var inputs = ['message in a boxxle']
var tape = require('tape')

module.exports = function (sodium) {

  inputs.forEach(function (msg, i) {
    var name = msg.toString().substring(0, 20)
    tape('sealed box:' + name, function (t) {

      var seed = sodium.randombytes_buf(32)
      var keys = sodium.crypto_box_seed_keypair(seed)
      var sealed_msg = sodium.crypto_box_seal(msg, keys.publicKey)

      t.deepEqual(
        sodium.crypto_box_seal_open(sealed_msg, keys.publicKey, keys.privateKey).toString(),
        msg
      )


      t.end()

    })
  })
}

if(!module.parent)
  module.exports(require('../browser'))
