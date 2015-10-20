app.controller('ArtistCtrl', function ($scope, $stateParams, PlayerFactory, theArtist) {
	
	$scope.artist = theArtist;

	$scope.isCurrent = function (song) {
		var current = PlayerFactory.getCurrentSong();
		return current && current._id == song._id;
	};
	$scope.start = function (song) {
		PlayerFactory.start(song, $scope.artist.songs);
	};

});