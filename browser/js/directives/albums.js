// app.directive('albumList', ['AlbumFactory', function(AlbumFactory){
// 	return {
// 		restrict: 'E',
// 		templateUrl: '/templates/albumList.html',
// 		scope: {
// 			albums: "="
// 		},
// 		link: function(scope){
				
// 		}
// 	}
// }])

app.directive('albumList', function(){
	return {
		restrict: 'E',
		templateUrl: '/templates/albumList.html',
		scope: {
			albums: "="
		},
		link: function(scope){
				
		}
	}
})

