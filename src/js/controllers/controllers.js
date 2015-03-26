(function(w,d,ng,ns,m) {

    'use strict';

    var app = ng.module(ns + '.' + m, [ns + '.services']);

    app.controller('MainCtrl', ['$scope', '$http', '$queryAPI' , function($scope, $http, $queryAPI) {
        
    }]);

    app.controller('SearchCtrl', ['$scope', '$http', '$queryAPI' , function($scope, $http, $queryAPI) {
        console.log('search controller');
        d.querySelector('.search form').addEventListener('submit', function (e) {
		    e.preventDefault();
		    $queryAPI.query(d.querySelector('.searchbox').value);
		}, false);
    }]);


})(window,document,window.angular,'myApp','controllers');