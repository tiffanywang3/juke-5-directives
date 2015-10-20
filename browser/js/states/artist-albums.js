app.config(function ($stateProvider) {
	$stateProvider.state('artist.albums', {
		url: '/albums',
		templateUrl: '/templates/artist-albums.html'
	});
});