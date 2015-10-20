const _ = require('lodash')
module.exports = function(schema) {
  schema.statics.findOrCreate = function(query, create) {
    var self = this
    return this
      .findOne(query)
      .then(function(result) {
        if(!result) {
          return self.create(_.merge(query, create))
        } else {
          return result
        }
      })
  }
}