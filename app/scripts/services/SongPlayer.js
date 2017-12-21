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
      * @param {Object} song
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
      *@function playSong
      *@desc Plays the audio file and sets the state of whether a song is playing (song.playing) to true
      *@param {Object} song
      */
      var playSong = function(song){
          currentBuzzObject.play();
          song.playing = true;
      }
      /**
      *@function SongPlayer.play
      *@desc Plays/pauses an audio file depending on its current state (i.e. if the clicked song is not the one currently playing, it will load and play the newly selected audio file; otherwise, if the clicked song is the one currently playing, it will pause it)
      *@param {Object} song
      */
      SongPlayer.play = function(song) {
        if (currentSong !== song) {
          setSong(song);
          playSong(song);
        }
        else if (currentSong === song) {
          if (currentBuzzObject.isPaused()) {
            playSong(song);
          }
        }
      };

      /**
      *@function SongPlayer.pause
      *@desc Pauses the currently playing audio file and sets the status of whether a song is playing (song.playing) to false
      *@param {Object} song
      */
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
