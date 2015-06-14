
var data = require('./data.json')

function B(b) {
  return new Buffer(b, 'base64')
}
var isArray = Array.isArray
var o = {}

for(var k in data) {
  o[k] = {}
  if(isArray(data[k]))
    o[k] = data[k].map(B)
  else
    for(var j in data[k]) {
      if(isArray(data[k][j]))
        o[k][j] = data[k][j].map(B)
      else
        o[k][j] = B(data[k][j])
    }
}

module.exports = o

if(!module.parent && process.title != 'browser')
  console.log(module.exports)
