(function() {
	var app = angular.module('map', ['ngResource', 'ngRoute']);

	app.controller('MapController', ['$scope', '$http', '$resource', 'InstagramService', function($scope, $http, $resource, InstagramService){
		$http.defaults.useXDomain = true;
		var search_url = 'https://api.instagram.com/v1/media/';
		var client_id = '7c37aa0576f344fda37cc3330d424e1f';
		
		$scope._access_token = '1106785275.7c37aa0.752a1359389d47008c2aa4d2504f2dbe'; //limpar
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
		$scope.getToken = function() {

		}
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

	app.factory("InstagramService", function ($rootScope, $location, $http) {
	    var client_id = "7c37aa0576f344fda37cc3330d424e1f";

	    var service = {
	        _access_token: null,
	        access_token: function(newToken) {
	            if(angular.isDefined(newToken)) {
	                this._access_token = newToken;
	            }
	            return this._access_token;
	        },
	        login: function () {
	        	console.log('vai abrir');
	            var igPopup = window.open("https://instagram.com/oauth/authorize/?client_id=" + client_id +
	                "&redirect_uri=" + $location.absUrl().split('#')[0] +
	                "&response_type=token", "igPopup");
	        }
	    };

	    $rootScope.$on("igAccessTokenObtained", function (evt, args) {
	        service.access_token(args.access_token);
	        console.log('Token: '+service.access_token);
	    });

	    return service;

	});

	app.config(function($routeProvider) {
	  $routeProvider
	  .when('/access_token=:access_token', {
	    //templateUrl: 'chapter.html',
	    controller: 'OAuthLoginController'
	  });
	});

	app.controller("OAuthLoginController", function ($scope, $stateParams, $window, $state) {
	    var $parentScope = $window.opener.angular.element(window.opener.document).scope();
	    if (angular.isDefined($stateParams.access_token)) {
	        $parentScope.$broadcast("igAccessTokenObtained", { access_token: $stateParams.access_token })
	    }
	    $window.close();
	});
})();