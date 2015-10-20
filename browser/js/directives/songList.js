app.directive('songList', function(){
	return {
		restrict: 'E',
		templateUrl: '/templates/songList.html',
		scope: {
			songs: "="
		},
		link: function(scope){
			scope.isCurrent = function (song) {
				var current = PlayerFactory.getCurrentSong();
				return current && current._id == song._id;
			};

			scope.start = function (song) {
				PlayerFactory.start(song, $scope.playlist.songs);
			};
		}
	}
})

