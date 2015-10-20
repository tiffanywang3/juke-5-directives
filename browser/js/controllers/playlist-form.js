app.controller('PlaylistFormCtrl', function ($scope, $state, PlaylistFactory) {

	$scope.createPlaylist = function () {
		$scope.hasSubmitted = true;
		PlaylistFactory
		.create($scope.newPlaylist)
		.then(function (playlist) {
			$state.go('playlist', {playlistId: playlist._id});
		})
		.catch(function (e) {
			$scope.hasSubmitted = false
			$scope.serverError = e.message || "Something went wrong!"
		});
	};

});