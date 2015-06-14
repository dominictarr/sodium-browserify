
var sodium = require('sodium/build/Release/sodium')

var random = require('crypto').randomBytes

var seed = random(32)
var k = sodium.crypto_sign_seed_keypair(seed)

function B (b) { return b.toString('base64') }
var msg = new Buffer('hello')
var inputs = [
  'trust but verify',
// - Ronald Regan

  'Military tactics are like unto water; '
+ 'for water in its natural course runs '
+ 'away from high places and hastens downwards. '
+ 'So in war, the way is to avoid what is strong '
+ 'and to strike at what is weak. ',
// - Sun Tzu, The Art of War

  'The last characteristic which we note in the history '
+ 'of cryptography is the division between amateur and '
+ 'professional cryptographers. Skill in production '
+ 'cryptanalysis has always been heavily on the side '
+ 'of the professionals, but innovation, particularly '
+ 'in the design of new types of cryptographic systems, '
+ 'has come primarily from the amateurs.'
// - Witfield Diffie, New Directions in Cryptography


].map(function (s) { return B(new Buffer(s)) })

function map(fn, args) {
  return inputs.map(function (msg) {
    return B(fn.apply(null, [new Buffer(msg, 'base64')].concat(args)))
  })
}

var data = {
  inputs: inputs,
  sign: {
    publicKey: B(k.publicKey),
    secretKey: B(k.secretKey),
    seed: B(seed),
    sign_detached: map(sodium.crypto_sign_detached, [k.secretKey]),
    sign: map(sodium.crypto_sign, [k.secretKey])
  }
}

console.log(JSON.stringify(data, null, 2))

