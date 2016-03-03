(function() {
	var app = angular.module('map', ['ngResource']);

	app.controller('MapController', ['$scope', '$http', '$resource', function($scope, $http, $resource){
		$http.defaults.useXDomain = true;
		var search_url = 'https://api.instagram.com/v1/media/';
		var client_id = '7c37aa0576f344fda37cc3330d424e1f';
		
		$scope._access_token = '6678174.467ede5.205a03ebc4b74d4082823781c3149575';
		$scope._picList = [];

		var instagramData = $resource(search_url, null, {
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
			console.log('Iniciando consulta: '+_lat+', '+_lng+', '+_distance);
			/*var pics = instagramData.search({lat: _lat, lng: _lng, distance: _distance}, function() {
				$scope._picList = pics.data;
			});*/
			$http.get('https://api.instagram.com/v1/media/search', {
				params: {lat: _lat, lng: _lng, distance: _distance, access_token: $scope._access_token}
			}).then(
				function successCallback(response) {
					console.log('foi');
					console.log(response);
				}, function errorCallbac(response) {
					console.log('deu ruim');
					console.log(response);
				}
			);
			//console.log(pics);
		};
	}]);
})();