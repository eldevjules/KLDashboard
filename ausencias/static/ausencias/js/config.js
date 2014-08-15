'use strict';

angular.module('KLDashboardClient.ausencias').config(['$stateProvider', '$urlRouterProvider',
    function( $stateProvider, $urlRouterProvider ) {

        $urlRouterProvider.when("", "/mias");
        $urlRouterProvider.when("/", "/mias");
        // For any unmatched url, send to /
        $urlRouterProvider.otherwise('/')

        $stateProvider
        .state(
            'ausencias',
            {
                abstract: true,
                url: '/',
                templateUrl: '/static/Ausencias/views/indexAusencias.html',
                controller: 'AusenciasAngularController'
            }
        )
        .state(
            'ausencias.mias',
            {
                url: 'mias',
                templateUrl: '/static/Ausencias/views/mias.html',
                controller: 'MiasAngularController'
            }
        )
        .state(
            'ausencias.historial',
            {
                url: 'historial',
                templateUrl: '/static/Ausencias/views/historial.html',
                controller: 'HistorialAngularController'
            }
        )
        .state(
            'ausencias.notificaciones',
            {
                url: 'notificaciones',
                templateUrl: '/static/Ausencias/views/notificaciones.html',
                controller: 'NotificacionesAngularController'
            }
        )
        .state(
            'ausencias.equipo',
            {
                url: 'equipo',
                templateUrl: '/static/Ausencias/views/equipo.html',
                controller: 'EquipoAngularController'
            }
        )
        .state(
            'ausencias.reglas',
            {
                url: 'reglas',
                templateUrl: '/static/Ausencias/views/reglas.html',
                controller: 'ReglasAngularController'
            }
        )
        .state(
            'ausencias.admin',
            {
                url: 'admin',
                templateUrl: '/static/Ausencias/views/admin.html',
                controller: 'AdminAngularController'
            }
        )
        ;
    }
]);

angular.module('KLDashboardClient.ausencias').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
