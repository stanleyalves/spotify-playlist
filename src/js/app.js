(function(w, d, n, ng, ns) {

    'use strict';

    var app = ng.module(ns, /* Module name */
        [ns + '.services', ns + '.directives', ns + '.controllers', ns + '.filters'] /* Module dependencies */);


    app.run(['$rootScope', '$http', function($rootScope, $http) {

    }]);

})(window,document,navigator,window.angular,'myApp');