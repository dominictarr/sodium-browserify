
var sodium = require('./browser')
var assert = require('assert')
var JSONB = require('json-buffer')
var tests = JSONB.parse(require('./data.json'))

var isArray = Array.isArray

function apply (ary) {
  var name = ary[0]
  var fn = name === 'deepEqual' ? assert.deepEqual : sodium['crypto_'+name]
  if(!fn) throw new Error('method: crypto_'+name+' does not exist')

  console.log("TEST", ary)
  return fn.apply(null, ary.slice(1).map(function (e) {
    return isArray(e) ? apply(e) : e
  }))
}


tests.forEach(apply)
