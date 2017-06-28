(function() {
    function SongPlayer($rootScope, Fixtures) {
      var SongPlayer = {};

/**
* @desc stores the album information
* @type {Object}
*/

      var currentAlbum = Fixtures.getAlbum();

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
          stopSong();
          // currentBuzzObject.stop();
          // SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });

      SongPlayer.currentSong = song;
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
* @function getSongIndex
* @desc gets the index of a selected song
* @param song, the selected song
*/

    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

/**
* @function stop song
* @desc Stops the currently playing song and sets playing to null
*/

    var stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    }

/**
* @desc Active song object from list of songs
* @type {Object}
*/

  SongPlayer.currentSong = null;

  /**
  * @desc Current playback time (in seconds) of currently playing song
  * @type {Number}
  */

  SongPlayer.currentTime = null;

/**
* @function SongPlayer.play
* @desc If the current song is not the same as the selected song, stop the current song and load new audio file,
* play selected song and set song playing to true
* @param {Object} song, the selected song
*/

      SongPlayer.play = function(song) {
        song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong !== song) {
          setSong(song);
          playSong(song);
          // currentBuzzObject.play();
          // song.playing = true;
        } else if (SongPlayer.currentSong === song) {
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
        song = song || SongPlayer.currentSong;
        currentBuzzObject.pause();
        song.playing = false;
      };

      /**
      * @function previous button
      * @desc Move to the previous song
      */

      SongPlayer.previous = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex--;
        if (currentSongIndex < 0) {
            stopSong();
              // currentBuzzObject.stop();
              // SongPlayer.currentSong.playing = null;
        } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
        }
      };

/**
* @function next button
* @desc Move to the next song
*/

      SongPlayer.next = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex++;
        if (currentSongIndex > 4) {
          stopSong();
          // currentBuzzObject.stop();
          // SongPlayer.currentSong.playing = null;
        } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
        }
      };

      /**
      * @function setCurrentTime
      * @desc Set current time (in seconds) of currently playing song
      * @param {Number} time
      */

      SongPlayer.setCurrentTime = function(time) {
        if (currentBuzzObject) {
          currentBuzzObject.setTime(time);
        }
      };



      return SongPlayer;
    };

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
