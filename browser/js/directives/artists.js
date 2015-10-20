app.directive('artistList', ['PlayerFactory', function(PlayerFactory){
	return {
		restrict: 'E',
		templateUrl: '/templates/artists.html',
		scope: {
			
		},
		controller: function($scope, PlayerFactory){
			$scope.getCurrentSong = PlayerFactory.getCurrentSong;
			$scope.isPlaying = PlayerFactory.isPlaying;
			$scope.forward = PlayerFactory.next;
			$scope.back = PlayerFactory.previous;

			$scope.getPercent = function () {
				return (100 * PlayerFactory.getProgress()) + '%';
			};

			$scope.toggle = function () {
				if (PlayerFactory.isPlaying()) PlayerFactory.pause();
				else PlayerFactory.resume();
			};
		},
		link: function(scope){
				
		}
	}
}])

