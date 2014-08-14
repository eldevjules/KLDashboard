var DashboardApp = angular.module('KLDashboardClient', ['ngRoute', 'ngCookies', 'ngResource', 'ui.router', 'KLDashboardClient.general', 'KLDashboardClient.ausencias', 'KLDashboardClient.directorio', 'KLDashboardClient.dojos', 'KLDashboardClient.servidores'], function($interpolateProvider) {

    'use strict';

    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');

});

//Esta variable se usa  a largo de la app para hacer llamadas absolutas via AJAX
var urlApp  = location.protocol+'//'+location.host;

DashboardApp.run(function($rootScope, $http, $cookies, $state, $stateParams){
    //Definimos el estado de la aplicación en el que nos encotramos al rootScope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    //Seteamos el token CSRF aquí para permitir llamadas AJAX al servidor en Django
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    
    //Usamos x-www-form-urlencoded Content-Type para emular llamadas ajax como lo hace Jquery
    //http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // Sobreescribimos $http service's default transformRequest para emular llamadas ajax como lo hace Jquery
    $http.defaults.transformRequest = [function(data){
        /**
        * The workhorse; converts an object to x-www-form-urlencoded serialization.
        * @param {Object} obj
        * @return {String}
        */ 
        var param = function(obj){
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;

            for(name in obj){
                value = obj[name];

                if(value instanceof Array){
                    for(i=0; i<value.length; ++i){
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }else if(value instanceof Object){
                    for(subName in value){
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }else if(value !== undefined && value !== null){
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];


    $rootScope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };


});

// Client Modules
angular.module('KLDashboardClient.general', []);
angular.module('KLDashboardClient.ausencias', []);
angular.module('KLDashboardClient.directorio', []);
angular.module('KLDashboardClient.dojos', []);
angular.module('KLDashboardClient.servidores', []);

// Configuracion de moment para toda la aplicacion

moment.lang('es', {
    months : [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ],
    monthsMin : [
        "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul",
        "Ago", "Sep", "Oct", "Nov", "Dic"
    ],
    weekdaysMin : ["D", "L", "M", "M", "J", "V", "S"],
    weekdays : ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

});