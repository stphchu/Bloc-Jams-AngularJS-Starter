(function() {
    function CollectionCtrl(Fixures) {
        this.albums = Fixures.getCollection(12);
      /*
      for (var i=0; i < 12; i++) {
      this.albums.push(angular.copy(albumPicasso));
      }
      */
    }

    angular
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();
