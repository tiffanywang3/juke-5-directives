// app.directive('songList', function(){
// 	return {
// 		restrict: 'E',
// 		templateUrl: '/templates/songList.html',
// 		scope: {
// 			songs: "="
// 		},
// 		link: function(scope){
// 			scope.isCurrent = function (song) {
// 				var current = PlayerFactory.getCurrentSong();
// 				return current && current._id == song._id;
// 			};

// 			scope.start = function (song) {
// 				PlayerFactory.start(song, $scope.playlist.songs);
// 			};
// 		}
// 	}
// })

app.directive('songList', ['PlayerFactory', function(PlayerFactory, $scope){
	return {
		restrict: 'E',
		templateUrl: '/templates/songList.html',
		scope: {
			songs: "="
		},
		link: function($scope){
			//console.log("PlayerFactory", PlayerFactory)
			$scope.isCurrent = function (song) {
				var current = PlayerFactory.getCurrentSong();
				return current && current._id == song._id;
			};
			$scope.start = function (song) {
				//console.log("$scope.songs", $scope.songs)
				PlayerFactory.start(song, $scope.songs);
			};
		}
	}
}])


























