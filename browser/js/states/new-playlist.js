app.config(function ($stateProvider) {
	$stateProvider.state('newPlaylist', {
		url: '/playlists/new',
		controller: 'PlaylistFormCtrl',
		templateUrl: '/templates/playlist-form.html'
	});
});