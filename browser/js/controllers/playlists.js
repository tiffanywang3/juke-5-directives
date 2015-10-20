app.controller('PlaylistsCtrl', function ($scope, PlaylistFactory) {
	PlaylistFactory.fetchAll()
	.then(function (playlists) {
		$scope.playlists = playlists;
	});
});