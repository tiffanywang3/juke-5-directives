app.controller('PlaylistCtrl', function ($scope, thePlaylist, PlaylistFactory, PlayerFactory) {
	
	$scope.playlist = thePlaylist;
	
	$scope.addSong = function (song) {
		return PlaylistFactory.addSong($scope.playlist._id, song)
		.then(function (addedSong) {
			$scope.playlist.songs.push(addedSong);
			return addedSong;
		});
	};

	$scope.isCurrent = function (song) {
		var current = PlayerFactory.getCurrentSong();
		return current && current._id == song._id;
	};

	$scope.start = function (song) {
		PlayerFactory.start(song, $scope.playlist.songs);
	};

});