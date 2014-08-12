'use strict';

angular.module('KLDashboardClient.general').config(['$stateProvider', '$urlRouterProvider',
    function( $stateProvider, $urlRouterProvider ) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state(
            'inicio',
            {
                url: '/dashboard',
                templateUrl: 'static/views/index.html',
                controller: 'GeneralAngularController'
            }
        );
    }
]);

// angular.module('KLDashboardClient.general').config(['$routeProvider',
//     function($routeProvider) {

//         $routeProvider.
//         when('/', {
//             templateUrl: 'static/views/index.html',
//             controller: 'InicioAngularController'
//         }).
//         otherwise({
//             redirectTo: '/'
//         });

//     }
// ]);

angular.module('KLDashboardClient.general').config(['$locationProvider', 
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);