var sodium = require('./index')

console.log(sodium)
var hash = sodium.crypto_scalarmult

var fail = require('chloride-test')(sodium).fail

if(fail) process.exit(fail)

sodium.events.on('sodium-browserify:wasm loaded', function() {
  if(hash != sodium.crypto_scalarmult)
    throw new Error('sodium.crypto_scalarmult has changed')
  process.exit(require('chloride-test')(sodium).fail)
})



