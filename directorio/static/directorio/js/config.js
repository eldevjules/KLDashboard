'use strict';

angular.module('KLDashboardClient.directorio').config(['$stateProvider', '$urlRouterProvider',
    function( $stateProvider, $urlRouterProvider ) {

        $urlRouterProvider.when("", "/lista");
        $urlRouterProvider.when("/", "/lista");
        // For any unmatched url, send to /
        $urlRouterProvider.otherwise('/lista')

        $stateProvider
        .state(
            'directorio',
            {
                abstract: true,
                url: '/',
                templateUrl: '/static/Directorio/views/indexDirectorio.html',
                controller: 'DirectorioAngularController'
            }
        )
        .state(
            'directorio.lista',
            {
                url: 'lista',
                templateUrl: '/static/Directorio/views/listDirectorio.html'
            }
        )
        .state(
            'directorio.alta',
            {
                url: 'alta',
                templateUrl: '/static/Directorio/views/createDirectorio.html',
                controller: 'DirectorioAltaAngularController'
            }
        )
        .state(
            'directorio.edicion',
            {
                url: ':id',
                templateUrl: '/static/Directorio/views/editDirectorio.html',
                controller: 'DirectorioEdicionAngularController'
            }
        );
    }
]);

angular.module('KLDashboardClient.directorio').config(['$locationProvider', 
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);