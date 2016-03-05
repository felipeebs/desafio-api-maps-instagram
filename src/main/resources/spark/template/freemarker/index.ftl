<!DOCTYPE html>
<html ng-app="map">
<head>
    <title>Teste GMaps+Instagram</title>
    <#include "header.ftl">
</head>

<body>

    <#include "nav.ftl">

<div ng-controller="MapController">
    <div class="container-fluid">
        <div class="row">
            <div id="map-container" class="col-xs-4">
                <ui-gmap-google-map center='map.center' zoom='map.zoom' events="map.events">
                    <ui-gmap-marker ng-if="marker.coords" coords="marker.coords" idkey="marker.id"></ui-gmap-marker>
                </ui-gmap-google-map>
            </div>
            <div class="col-xs-8">
                <div class="alert alert-info" role="alert" ng-if="!searchParams.lat">
                    <span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
                    Clique no <strong>mapa</strong> para carregar fotos.</div>
                <div class="alert alert-warning" role="alert" ng-show="noPics">
                    <span class="glyphicon glyphicon-picture" aria-hidden="true"></span>
                    Parece que ningu&eacute;m enviou fotos daqui... :(</div>
                <div class="row">
                    <div class="col-xs-3" ng-repeat="pic in pics">
                        <div class="thumbnail">
                            <a href="{{pic.link}}">
                                <img ng-src="{{pic.images.thumbnail.url}}" />
                            </a>
                            <div class="overlay">
                                <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                            </div>
                            <div class="caption">
                                <div class="media">
                                    <div class="media-left">
                                        <img class="profile-picture media-object" ng-src="{{pic.user.profile_picture}}" title="{{pic.user.username}}" height="50" width="50" />
                                    </div>
                                    <div class="media-body">
                                        <strong>{{pic.user.full_name}}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button ng-show="hasMore" ng-click="loadMore()">Caregar mais...</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
