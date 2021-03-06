(function() {
	var app = angular.module('map', ['ngResource', 'uiGmapgoogle-maps']);

	app.controller('MapController', ['$scope', 'uiGmapIsReady', 'instagramService', function($scope, uiGmapIsReady, instagramService){

		// Inicialização de variáveis de escopo
		$scope.pics = [];
		$scope.noPics = false;
		$scope.hasMore = false;
		$scope.marker = { id: 0 }
		$scope.searchParams = { distance: 1000 };

		// Configuração do uiGmapgoogle-maps
		$scope.map = {
			zoom: 14,
			center: {
				latitude: -8.0611,
				longitude: -34.8717
			},
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
					}
					$scope.centerMap(lat, lng);
					$scope.executeSearch(lat, lng, $scope.searchParams.distance);
				}
			}
		};

		// Por algum motivo quebra o funcionamento dos listeners do mapa
		// Aguarda inicialização do mapa e carrega geolocalização do navegador, se disponível
		uiGmapIsReady.promise().then(function(maps) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function (location) {
					var lat = location.coords.latitude;
					var lng = location.coords.longitude;
					$scope.centerMap(lat, lng);
				});
			}
		});

		// Movido para reutilização (geolocalização e evento click)
		// Centraliza o mapa nas coordenadas recebidas
		$scope.centerMap = function(lat, lng) {
			$scope.map.center = {
				latitude: lat,
				longitude: lng
			};
			$scope.$apply();
		}

		// Executa a busca por fotos nas coordenadas recebidas
		$scope.executeSearch = function (lat, lng, distance) {
			//TODO: mostrar loading
			$scope.searchParams.lat = lat;
			$scope.searchParams.lng = lng;
			$scope.searchParams.distance = distance;
			$scope.searchParams.max_timestamp = '';
			instagramService.search($scope.searchParams, function(response) {
				$scope.pics = [];
				$scope.pics = response.data;
				// Verifica possibilidade de haver mais fotos nessas coordenadas e atualiza parâmetros
				var len = response.data.length;
				$scope.noPics = len == 0
				if (len > 0) {
					$scope.hasMore = len == 20;
					$scope.searchParams.max_timestamp = response.data[len-1].created_time-100;
				}
				//TODO: esconder loading
			});
		};

		// Executa a busca com os parâmetros atuais
		$scope.loadMore = function () {
			instagramService.search($scope.searchParams, function(response) {
				angular.forEach(response.data, function(pic) {
					$scope.pics.push(pic);
				});
				// Verifica possibilidade de haver mais fotos nessas coordenadas e novamente atualiza parâmetros
				var len = response.data.length;
				if (len > 0) {
					$scope.hasMore = response.data.length == 20;
					$scope.searchParams.max_timestamp = response.data[len-1].created_time-100;
				}
			});
		};
	}]);

	app.factory('instagramService', function ($resource) {
		// Resource para pesquisar na API do Instagram
		var access_token = '6678174.467ede5.205a03ebc4b74d4082823781c3149575';
		var instagramResource = $resource('https://api.instagram.com/v1/media/:action', null, {
			search:{
				method: 'JSONP',
				params: {
					action: 'search',
					lat: '@lat',
					lng: '@lng',
					max_timestamp: '@max_timestamp',
					min_timestamp: '@min_timestamp',
					distance: '@distance',
					access_token: access_token,
					callback: 'JSON_CALLBACK'
				}
			},
			media: {
				method: 'JSONP',
				params: {
					action: '@id',
					access_token: access_token,
					callback: 'JSON_CALLBACK'
				}
			}
		});
		return instagramResource;
	});

	app.factory('userService', function ($resource) {
		// Resource para interagir com o back-end
		var userResource = $resource('/user/:action', null, {
			login: {
				method: 'POST',
				params: {
					action: 'auth',
				}
			},
			getFavorites: {
				method: 'GET',
				isArray: true,
				params: {
					action: '@id/favorites',
				}
			}
		});
		return userResource;
	});

	app.factory('favoriteService', function ($resource) {
		// Resource para interagir com o back-end
		var userResource = $resource('/favorite/:action', null, {
			get: {
				method: 'GET',
				params: {
					action: 'single',
					userId: '@userId',
					mediaId: '@mediaId'
				}
			},
			add: {
				method: 'POST',
				params: {
					action: 'add'
				}
			},
			edit: {
				method: 'PUT',
				params: {
					action: 'edit'
				}
			},
			remove: {
				method: 'DELETE',
				params: {
					action: 'remove'
				}
			}
		});
		return userResource;
	});
})();
