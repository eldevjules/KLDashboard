'use strict';

angular.module('KLDashboardClient.directorio').config(['$stateProvider', '$urlRouterProvider',
    function( $stateProvider, $urlRouterProvider ) {

        $urlRouterProvider.when("", "/lista");
        $urlRouterProvider.when("/", "/lista");
        // For any unmatched url, send to /
        $urlRouterProvider.otherwise('/')

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
            'directorio.listaAdmin',
            {
                url: 'lista-admin',
                templateUrl: '/static/Directorio/views/listAdminDirectorio.html',
                controller: 'DirectorioListAdminAngularController'
            }
        )
        .state(
            'directorio.lista',
            {
                url: 'lista',
                templateUrl: '/static/Directorio/views/listDirectorio.html',
                controller: 'DirectorioListAngularController'
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