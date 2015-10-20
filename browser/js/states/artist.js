app.config(function ($stateProvider) {
	$stateProvider.state('artist', {
		url: '/artist/:artistId',
		templateUrl: '/templates/artist.html',
		controller: 'ArtistCtrl',
		resolve: {
			theArtist: function (ArtistFactory, $stateParams) {
				return ArtistFactory.fetchById($stateParams.artistId);
			}
		}
	});
});