
//only exports browser api. use chloride module
//to get automatic fallbacks!

//load tweetnacl first, so that it works sync, and everything is there.
var exports = require('sodium-browserify-tweetnacl')

for(var k in exports) (function (k) {
  if('function' == typeof exports[k])
    //functions that wrap references to exports,
    //so if you grab a reference when it's pointing at tweetnacl
    //it will switch to wasm when that's ready.
    module.exports[k] = function () {
      return exports[k].apply(this, arguments)
    }
})(k)

//now load wasm which has to be async, ugh.
var libsodium = require('libsodium-wrappers')
libsodium.ready.then(function (value, what) {
  require('./browser') (libsodium, exports)
  //set module.exports so that it 
  module.exports = exports
}).catch(function (err) {
  //escape from promise land, ugh
  setTimeout(function () {
    console.log(err.stack)
    process.exit(1)
  })
})









