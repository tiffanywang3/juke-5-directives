app.factory('PlayerFactory', function ($rootScope) {

	var audio = document.createElement('audio');
	var isPlaying = false;
	var currentSongList;
	var currentSong = null;
	var progress = 0;
	var Player = {};

	Player.getCurrentSong = function () {
		return currentSong;
	};

	Player.getProgress = function () {
		return progress;
	};

	Player.isPlaying = function () {
		return isPlaying;
	};

	function load (song, songList) {
		audio.src = song.audioUrl;
		audio.load();
		currentSong = song;
		currentSongList = songList;
		progress = 0;
	}

	Player.pause = function () {
		audio.pause();
		isPlaying = false;
	};

	Player.resume = function () {
		audio.play();
		isPlaying = true;
	};

	Player.start = function (song, songList) {
		songList = songList || currentSongList;
		Player.pause();
		load(song, songList);
		Player.resume();
	};

	function moveTo (index) {
		index += currentSongList.length
		index %= currentSongList.length;
		Player.start(currentSongList[index]);
	};

	Player.next = function () {
		var index = currentSongList.indexOf(currentSong);
		moveTo(index + 1);
	};

	Player.previous = function () {
		var index = currentSongList.indexOf(currentSong);
		moveTo(index - 1);
	};

	audio.addEventListener('timeupdate', function () {
		progress = audio.currentTime / audio.duration;
		$rootScope.$digest();
	});

	audio.addEventListener('ended', function () {
		Player.next();
		$rootScope.$digest();
	});

	return Player;
});