app.config(function ($stateProvider) {
	$stateProvider.state('artists', {
		url: '/artists',
		templateUrl: '/templates/artists.html',
		controller: 'ArtistsCtrl',
		resolve: {
			allArtists: function (ArtistFactory) {
				return ArtistFactory.fetchAll();
			}
		}
	});
});