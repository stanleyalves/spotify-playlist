(function(w,d,ng,ns,m) {

    'use strict';

    var app = ng.module(ns + '.' + m, [ns + '.services']);

    app.controller('MainCtrl', ['$scope', '$http', '$lineStatus' , function($scope, $http, $lineStatus) {
        
 		var status = $lineStatus.query();
 		// console.log(status)

    }]);


})(window,document,window.angular,'myApp','controllers');