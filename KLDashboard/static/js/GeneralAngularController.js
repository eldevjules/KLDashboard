'use strict';

angular.module('KLDashboardClient.general').controller('GeneralAngularController', ['$scope','$location', function ($scope, $location) {
    
    $scope.dashboardModule = "Inicio";
    $scope.absUrl = $location.$$absUrl;

    $scope.activeItem = '';

    $scope.$on('$routeChangeSuccess', function(scope, next, current){
        if ( $scope.absUrl.indexOf('directorio') != -1 ) {
            $scope.activeItem = 'directorio';
        } else if ( $scope.absUrl.indexOf('ausencias') != -1 ) {
            $scope.activeItem = 'ausencias';
        } else if ( $scope.absUrl.indexOf('servidores') != -1 ){
            $scope.activeItem = 'servidores';
        } else if( $scope.absUrl.indexOf('dojos') != -1 ) {
            $scope.activeItem = 'dojos';
        };
    });

}]);
