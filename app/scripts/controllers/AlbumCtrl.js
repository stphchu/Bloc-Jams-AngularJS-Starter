(function() {
    function AlbumCtrl(Fixtures) {
        //this.albumData = albumPicasso; // Original from assignment
        //this.albumData = angular.copy(albumPicasso); // From Checkpoint 6 (Services Part 1)
        this.albumData = Fixtures.getAlbum();
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();
