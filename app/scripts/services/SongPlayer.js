(function() {
    function SongPlayer() {
      var SongPlayer = {};

      var currentSong = null;

      /**
      * @desc Buzz object audio file
      * @type {Object}
      */
      var currentBuzzObject = null;
/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song, the selected song
*/
      var setSong = function(song) {
        if (currentBuzzObject) {
          currentBuzzObject.stop();
          currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    };

/**
* @function playSong
* @desc Plays the song selected and sets song playing to true
* @param {Object} songPlay, the selected song
*/

    var playSong = function(songPlay) {
      currentBuzzObject.play();
      songPlay.playing = true;
    };
/**
* @function SongPlayer.play
* @desc If the current song is not the same as the selected song, stop the current song and load new audio file,
* play selected song and set song playing to true
* @param {Object} song, the selected song
*/

      SongPlayer.play = function(song) {
        if (currentSong !== song) {
          setSong(song);
          playSong(song);
          // currentBuzzObject.play();
          // song.playing = true;
        } else if (currentSong === song) {
          if (currentBuzzObject.isPaused()) {
              // currentBuzzObject.play();
              playSong(song);
          }
        }
      };

/**
* @function SongPlayer.pause
* @desc Pauses the selected song and changes song.playing to false
* @param {Object} song, the selected song
*/

      SongPlayer.pause = function(song) {
        currentBuzzObject.pause();
        song.playing = false;
      };

      return SongPlayer;
    };

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
