
//only exports browser api. use chloride module
//to get automatic fallbacks!

//load tweetnacl first, so that it works sync, and everything is there.
var exports = require('sodium-browserify-tweetnacl')

for(var k in exports) (function (k) {
  if('function' == typeof exports[k])
    module.exports[k] = function () {
      return exports[k].apply(this, [].slice.call(arguments))
    }
})(k)

//now load wasm which has to be async, ugh.
var libsodium = require('libsodium-wrappers')
libsodium.ready.then(function (value, what) {
  require('./browser') (libsodium, exports)
}).catch(function (err) {
  //escape from promise land, ugh
  setTimeout(function () {
    console.log(err.stack)
    process.exit(1)
  })
})








