const dir = process.argv[2]
const fs = require('fs-extra')
const Promise = require('bluebird')
const pathLib = require('path')
const helper = require('./helper')
const _ = require('lodash')
const metadata = require('./metadataWrapper')
Promise.promisifyAll(fs);

const mongoose = require('mongoose')
const connectToDb = require('../server/db')
const Song = mongoose.model('Song')

const filesDir = pathLib.join(process.cwd(), 'server/audio')

const extractMetaData = function(path) {
  return helper.dirWalk(path)
    .then(function(filesNames) {
      return filesNames.filter(helper.isMp3)
    })
    .map(function(name) {
      return metadata(name)
    })

}

const clearDb = function() {
  return Promise.map(['Artist', 'Album', 'Song'], function(modelName) {
    return mongoose.model(modelName).remove()
  })
}

connectToDb.bind({ docsToSave: {} })
  .then(function() {
    // get song metadata and clear db at same time
    return Promise.join(extractMetaData(dir), clearDb())
  })

  // create the artists
  .spread(function(meta, removeresponses) {
    this.files = meta
    let artists = _(this.files)
      .pluck('artist')
      .flatten()
      .uniq()
      .value()
    return Promise.map(artists, function(artist) {
      return mongoose.model('Artist').findOrCreate({ name: artist })
    })
  })

  // create the albums
  .then(function(artists) {
    this.artists = _.indexBy(artists, 'name')

    return Promise.map(_(this.files)
      .pluck('album')
      .uniq()
      .value()
      , function(album) {
        return mongoose.model('Album').findOrCreate({ name: album })
      })
  })

  // create the songs
  .then(function(albums) {
    this.albums = _.indexBy(albums, 'name')
    this.files = this.files.map(function(file) {
      file.song = new Song({
        name: file.title,
        artists: file.artist.map( a => this.artists[a], this),
        genres: file.genre
      })
      file.song.extension = pathLib.extname(file.path)
      return file
    }, this)
    return Promise.all(_(this.files)
      .pluck('song')
      .invoke('save')
      .value())
  })

  // empty the audio folder (or create it if it does not yet exists)
  .tap(function() {
    return fs.emptyDirAsync(filesDir);
  })

  // move the files
  .then(function(songs) {
    this.songs = songs
    return Promise.map(this.files, function(file) {
      return new Promise(function(resolve, reject) {
        let readStream = fs.createReadStream(file.path)
        let writeStream = fs.createWriteStream(pathLib.join(filesDir, file.song.id))
        readStream.on('error', reject)
        writeStream.on('error', reject)
        writeStream.on('finish', resolve)
        readStream.pipe(writeStream)
      })
    })
  })

  //associate the songs with their albums
  .then(function() {
    // push into albums' song arrays



    this.files.forEach(function(file) {
      var album = this.albums[file.album]
      album.songs.push(file.song)
      if(file.picture && file.picture.data) {
        album.cover = file.picture.data
        album.coverType = file.picture.format
      }
    }, this)


    // save albums
    return Promise.all(
      _(this.albums)
        .values()
        .invoke('save')
        .value()
      )
  })

  .then(function() {
    console.log('complete!')
    process.exit(0)
  })
  .catch(function(e) {
    console.error(e)
    console.error(e.stack)
    process.exit()
  })