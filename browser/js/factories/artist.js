app.factory('ArtistFactory', function ($http, $q, AlbumFactory, SongFactory) {
	var ArtistFactory = {};
	ArtistFactory.fetchAll = function () {
		return $http.get('/api/artists')
		.then(function (response) {
			return response.data;
		});
	};
	ArtistFactory.fetchById = function (id) {
		var url = '/api/artists/' + id;
		return $q.all([$http.get(url), $http.get(url + '/songs'), $http.get(url + '/albums')])
		.then(function (arr) {
			var artist = arr[0].data;
			var songs = arr[1].data.map(SongFactory.convert);
			var albums = arr[2].data.map(AlbumFactory.convert);
			artist.songs = songs;
			artist.albums = albums;
			return artist;
		});
	};
	return ArtistFactory;
});