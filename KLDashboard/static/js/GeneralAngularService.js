//Global service for global variables
angular.module('KLDashboardClient.system').factory('Global', [
    function() {
        'use strict';
        var _this = this;
        _this._data = {
            user: window.user,
            authenticated: !! window.user
        };
        return _this._data;
    }
]);
