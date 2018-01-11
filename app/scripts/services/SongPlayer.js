(function() {
    function SongPlayer(Fixtures) {
      var SongPlayer = {};

      /**
      * @desc Stored current album information
      * @type {Object}
      */
      var currentAlbum = Fixtures.getAlbum();

      /**
      * @function getSongIndex
      * @desc Returns index of a song
      * @param {Object} song
      */
      var getSongIndex = function(song) {
          return currentAlbum.songs.indexOf(song);
      };

      /**
      * @desc Active song object from list of songs
      * @type {Object}
      */
      SongPlayer.currentSong = null;

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
           stopSong(SongPlayer.currentSong);
         }
         currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
         });
         SongPlayer.currentSong = song;
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
      *@function stopSong
      *@desc Stops the audio file and sets the state of whether a song is playing (song.playing) to null
      *@param {Object} song
      */
      var stopSong = function(song){
          currentBuzzObject.stop();
          song.playing = null;
      }

      SongPlayer.currentSong = null;

      /**
      *@function SongPlayer.play
      *@desc Plays/pauses an audio file depending on its current state (i.e. if the clicked song is not the one currently playing, it will load and play the newly selected audio file; otherwise, if the clicked song is the one currently playing, it will pause it)
      *@param {Object} song
      */
      SongPlayer.play = function(song) {
        song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong !== song) {
          setSong(song);
          playSong(song);
        }
        else if (SongPlayer.currentSong === song) {
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
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
    *@function SongPlayer.previous
    *@desc Uses getSongIndex function to get the index of the currently playing song and then decrease that index by one
    *@param {Object}
    */
    SongPlayer.previous = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex--;

        if (currentSongIndex < 0) {
          stopSong(SongPlayer.currentSong);
        } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
          }
    };

    SongPlayer.next = function(){
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex > currentSongIndex.length) {
        stopSong(SongPlayer.currentSong);
      } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
        }
    };

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
