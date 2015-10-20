app.config(function ($stateProvider) {
	$stateProvider.state('artist.songs', {
		url: '/songs',
		templateUrl: '/templates/artist-songs.html'
	});
});