/*globals angular firebase*/
/*eslint-env browser */
angular.module("bkApp").directive('navigation', function() {
	return {
		restrict: 'E',
		scope: {},
		controller: 'navigationController',
		templateUrl: 'app/navigation/menu.html'
	};
});