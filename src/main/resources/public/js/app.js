(function() {
	var app = angular.module('map', []);

	app.controller('MapController', ['$scope', '$http', '$resource', function($scope, $http, $resource){
		var search_url = 'https://api.instagram.com/v1/media/';
		var client_id = '7c37aa0576f344fda37cc3330d424e1f';
		
		$scope._access_token = '';
		$scope._picList = [];

		var instaData = $resource(search_url, null, {
			search:{
				//?lat=48.858844
				//&lng=2.294351
				//&access_token=ACCESS-TOKEN
				method: 'GET',
				params: {
					lat: '@lat',
					lng: '@lng',
					distance: '@distance',
					access_token: $scope._access_token
				},
				isArray: true
			}
		});
		$scope.executeSearch = function (_lat, _lng, _distance) {
			var pics = instaData.search({lat: _lat, lng: _lng, distance: _distance}, function() {
				$scope._picList = pics.data;
			});
		};
	}]);
})();