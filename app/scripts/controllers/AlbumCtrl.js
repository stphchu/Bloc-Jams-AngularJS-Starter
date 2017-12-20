(function() {
    function AlbumCtrl(Fixtures, SongPlayer) {
        //this.albumData = albumPicasso; // Original from assignment
        //this.albumData = angular.copy(albumPicasso); // From Checkpoint 6 (Services Part 1)
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();
