var n = require('./')
var b = require('libsodium-wrappers')

var o = {}

for (var k in b) {
  if(n[k])
    o[k] = true
}

console.log(Object.keys(o))
