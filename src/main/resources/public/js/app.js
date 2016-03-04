(function() {
	var app = angular.module('map', ['ngResource', 'uiGmapgoogle-maps']);

	app.controller('MapController', ['$scope', '$http', '$resource', function($scope, $http, $resource){

		$scope.pics = [];
		$scope.marker = {
			id: 0
		}
		$scope.map = {
			center: {
				latitude: -8.0611,
				longitude: -34.8717
			},
			zoom: 14,
			events: {
				click: function (map, event, args) {
					var location = args[0];
					var lat = location.latLng.lat();
					var lng = location.latLng.lng();
					$scope.marker = {
						id: 0,
						coords: {
							latitude: lat,
							longitude: lng
						}
					};
					$scope.executeSearch(lat, lng, 1000);
					$scope.$apply();
				}
			}
		};

		var search_url = 'https://api.instagram.com/v1/media/';
		var client_id = '7c37aa0576f344fda37cc3330d424e1f';
		
		//$scope._access_token = '1106785275.7c37aa0.752a1359389d47008c2aa4d2504f2dbe'; //limpar
		$scope._access_token = '6678174.467ede5.205a03ebc4b74d4082823781c3149575';
		$scope._searchParams = {};
		//https://www.instagram.com/oauth/authorize/?client_id=7c37aa0576f344fda37cc3330d424e1f&redirect_uri=https%3A%2F%2Fnameless-atoll-45479.herokuapp.com&response_type=token&scope=public_content
		var instagramData = $resource(search_url+':action', null, {
			search:{
				//?lat=48.858844
				//&lng=2.294351
				//&access_token=ACCESS-TOKEN
				method: 'JSONP',
				params: {
					action: 'search',
					lat: '@lat',
					lng: '@lng',
					max_timestamp: '@max_timestamp',
					min_timestamp: '@min_timestamp',
					distance: '@distance',
					access_token: $scope._access_token,
					callback: 'JSON_CALLBACK'
				}
			}
		});

		$scope.executeSearch = function (lat, lng, distance) {
			// mostrar loading
			$scope._searchParams.lat = lat;
			$scope._searchParams.lng = lng;
			$scope._searchParams.distance = distance;
			$scope._searchParams.max_timestamp = '';
			console.log(['Iniciando busca', $scope._searchParams]);
			instagramData.search($scope._searchParams, function(response) {
				$scope.pics = [];
				console.log('foi');
				console.log(response);
				//filtrar type==image
				$scope.pics = response.data;
				$scope._searchParams.max_timestamp = response.data[response.data.length-1].created_time-100;
			});
			/*$http.get('https://api.instagram.com/v1/media/search', {
				params: {lat: lat, lng: lng, distance: distance, access_token: $scope._access_token}
			}).then(
				function successCallback(response) {
					console.log('foi');
					console.log(response);
				}, function errorCallbac(response) {
					console.log('deu ruim');
					console.log(response);
				}
			);*/
		};
		$scope.loadMore = function () {
			//created_time-100
			console.log('Buscando mais: '+$scope.max_timestamp);
			instagramData.search($scope._searchParams, function(response) {
				$scope._picList.push(response.data); // talvez rodar foreach
				$scope._searchParams.max_timestamp = response.data[response.data.length-1].created_time-100;
				console.log($scope._searchParams.max_timestamp);
			});
		};
		//$scope.lastOne = $filter('orderBy')($scope.pics,'-created_time')[this.data.length-1].created_time-100;

		var user = $resource('/user/:action', null, {
			getCode: {
				method: 'GET',
				params: {
					action: 'getCode'
				}
			},
			getToken: {
				method: 'GET',
				params: {
					action: 'getToken',
					code: '@code'
				}
			}
		});
	}]);
})();