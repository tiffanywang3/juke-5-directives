const mongoose = require('mongoose'),
      songListPlugin = require('../plugins/songList'),
      findOrCreate = require('../plugins/findOrCreate')

const Schema = mongoose.Schema

var schema = new Schema({
  name: { type: String, required: true, trim: true },
  cover: {type: Buffer, select: false },
  coverType: { type: String, select: false }
})

// this plugin gives it song and artist arrays
// with some fancy validations and auto population
// check it out!
schema.plugin(songListPlugin)
schema.plugin(findOrCreate)

module.exports = mongoose.model('Album', schema)