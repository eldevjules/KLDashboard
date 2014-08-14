'use strict';

angular.module('KLDashboardClient.general').controller('GeneralAngularController', ['$scope', '$rootScope', function ($scope, $rootScope) {

    $scope.dashboardModule = "";
    $scope.activeItem = '';

    $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams){
        $scope.dashboardModule = "Directorio";
        $scope.activeItem = 'directorio';
    })

}]);
