const Promise = require('bluebird')
const fs = require('fs')
const mm = require('musicmetadata')

/*
Omri & Zeke:
  We needed to write a wrapper around `musicmetadata` because
  of a bug we discovered in their use of a single reused buffer
  for all of their album art work. album <-> art <-> song  assoc
  was incorrect.
*/


module.exports = function(name) {
  return new Promise(function(resolve, reject) {
    mm(fs.createReadStream(name), function(err, metadata) {
      if(err) return reject(err)
      metadata.path = name

      metadata.picture = metadata.picture[0] || { data: new Buffer(0), format: 'jpg' }
      var x = new Buffer(metadata.picture.data.length)
      metadata.picture.data = metadata.picture.data.copy(x)
      metadata.picture.data = x

      resolve(metadata)
    })
  })
}