app.directive('artistLinks', function(){
	return {
		restrict: 'E',
		templateUrl:'/templates/artistLinks.html',
		scope: {
			artists: "="
		},
		link: function(scope){

		}
	}
})