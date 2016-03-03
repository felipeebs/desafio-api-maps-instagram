<!DOCTYPE html>
<html ng-app="map">
<head>
    <#include "header.ftl">
</head>

<body ng-controller="MapController">

  <#include "nav.ftl">

  <div>
      <div class="container-fluid">
          <ul class="list-group">
              <li class="list-group-item" ng-repeat="pic in pics">{{pic.title}} - {{pic.author}} - {{pic.created}}</li>
          </ul>
      </div>
  </div>

  <div id="map"></div>
</body>
</html>