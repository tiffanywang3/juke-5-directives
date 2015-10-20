app.directive('doubleClick', function(){
	return {
		restrict: 'A',
		scope: {
			doubleClick: "&"
		},
		link: function(scope, element){
			var state = 'clicked';
            
			element.on('doubleClick', function(){
				state = (state == 'clicked' ? 'unclicked' : 'clicked');
            	element.css('double-click', state);
			})
		}
	}
})










