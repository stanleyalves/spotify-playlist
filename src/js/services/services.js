(function(w,d,ng,ns,m) {

    'use strict';

    var app = ng.module(ns + '.' + m /* module name */, [ ] /* module dependencies */);

	app.factory('$queryAPI', ['$http', function($http) {
        var query = function (q) {
            var url = 'https://api.spotify.com/v1/search?q=' + q + '&type=artist'

            $http.get(url).
            success(function(data) {
                console.log('success')
                console.log(data);
                return data;
            }).
            error(function(data) {
                console.log('fail')
            });
        };

        return {
            query: query
        };

    }]);



})(window,document,window.angular,'myApp','services');