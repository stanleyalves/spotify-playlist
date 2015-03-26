(function(w,d,ng,ns,m) {

    'use strict';

    var app = ng.module(ns + '.' + m /* module name */, [ ] /* module dependencies */);

	app.factory('$queryAPI', ['$http', function($http) {
        
        function query(query) {
            var url = 'https://api.spotify.com/v1/search?q=' + query + '&type=artist'
            $http.get(url).success(function(data) {
                console.log(data);
            });
        };


	    return {
            query: query
        };

    }]);



})(window,document,window.angular,'myApp','services');