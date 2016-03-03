<!DOCTYPE html>
<html ng-app="map">
<head>
    <#include "header.ftl">
</head>

<body>

    <#include "nav.ftl">

    <div ng-controller="MapController">
        <button ng-click="executeSearch('48.858844','2.294351','1000')"> Start </button>
        <div class="container-fluid">
            <ul class="list-group">
                <li class="list-group-item" ng-repeat="pic in pics">{{pic.link}} - {{pic.user}} - {{pic.id}}</li>
            </ul>
        </div>
    </div>

    <div id="map"></div>
</body>
</html>