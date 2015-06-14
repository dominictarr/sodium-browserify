
var sodium = require('libsodium-wrappers')

function I(b) {
  return Buffer.isBuffer(b) ? new Uint8Array(b) : b
}

function B(b) {
  console.log((b instanceof Uint8Array) ? new Buffer(b) : b)
  return (b instanceof Uint8Array) ? new Buffer(b) : b
}

function bufferize(fn) {
  if('function' !== typeof fn)
    throw new Error('not a function')
  return function () {
    console.log(arguments)
    var args = [].map.call(arguments, I)
    var r =  B(fn.apply(this, args))
    console.log(r)
    return r
  }
}
;[
  'sign_seed_keypair',
  'sign_keypair',
]

function keys (k) {
  return {
    publicKey: B(k.publicKey),
    secretKey: B(k.secretKey || k.privateKey)
  }
}

exports.crypto_sign_seed_keypair = function (seed) {
  return keys(sodium.crypto_sign_seed_keypair(I(seed)))
}

exports.crypto_sign_keypair = function () {
  return keys(sodium.crypto_sign_keypair())
}

;[
  'sign_verify_detached',
  'sign_detached',
  'sign',
  'sign_open'
].forEach(function (name) {
  exports['crypto_'+name] = bufferize(sodium['crypto_'+name])
})
