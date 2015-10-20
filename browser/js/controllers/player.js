app.controller('PlayerCtrl', function ($scope, PlayerFactory) {

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

});