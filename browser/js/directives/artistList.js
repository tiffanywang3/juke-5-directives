app.directive('artistList', ['PlayerFactory', function(PlayerFactory, $scope){
	return {
		restrict: 'E',
		templateUrl:'/templates/artistList.html',
		scope: {
			artists: "="
		},
		link: function(scope){

		}
	}
}])