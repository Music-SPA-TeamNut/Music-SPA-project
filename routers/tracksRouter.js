var express = require('express');
  // idGenerator = require('../utils/id-generator')();

require('../polyfills/array');

module.exports = function(db) {
  var router = express.Router();

  router.get('/', function(req, res) {
      var user = req.user;
      if (!user) {
        res.status(401)
          .json('Not authorized User');
        return;
      }
      var songs = user.songList;
    
      res.json({
        result: songs
      });
    })
    .post('/', function(req, res) {
      var user = req.user;
      if (!user) {
        res.status(401)
          .json('You need to be logged in to add songs to your playlist :)');
        return;
      }

      var id = req.body.id;

      if(user.songList.find(function(dbSong) {
        return dbSong.id === id;
      })) {
        res.status(200)
          .json('This song is already in your playlist');
          return;
      }
      var song = req.body;
      // user.songList = user.songList || [];

      user.songList.push(song);

      res.status(201)
        .json('Song added to your playlist');
    })
    .put('/:id', function(req, res) {
      var user = req.user;
      if (!user) {
        res.status(401)
          .json('Not authorized User');
        return;
      }
      var id = req.params.id;
      var index = user.songList.findIndex(function(dbSong) {
        return dbSong.id === id;
      });
      if (index < 0) {
        res.status(404)
          .json('Song with such id does not exist in DB');
        return;
      }

      user.songList.splice(index, 1)

      db.save();

      res.json(
        'Song removed from your playlist'
      );
    });
  return router;
};