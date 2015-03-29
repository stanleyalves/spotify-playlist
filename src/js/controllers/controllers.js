(function(w,d,ng,ns,m) {

    'use strict';

    var app = ng.module(ns + '.' + m, [ns + '.services']);

    app.controller('MainCtrl', ['$scope', '$http', '$queryAPI' , function($scope, $http, $queryAPI) {
        
    }]);

    app.controller('BackgroundCtrl', ['$scope', '$http', '$queryAPI' , function($scope, $http, $queryAPI) {
        var artists = ['Michael Jackson','Jay-z', 'The smiths', 'Beyonce', 'Iron Maiden'],
            randomArist = artists[Math.floor(Math.random() * artists.length)],
            url = 'https://api.spotify.com/v1/search?q=' + randomArist + '&type=artist';

        $http.get(url).success(function (data) {
            console.log(data);
            //The image;
            console.log(data.artists.items[0].images)

            $scope.backgroundHero = data.artists.items[0].images[0].url;
        });
    }]);

    app.controller('SearchCtrl', ['$scope', '$http', '$queryAPI' , function($scope, $http, $queryAPI) {
        console.log('search controller');
        d.querySelector('.search form').addEventListener('submit', function (e) {
		    e.preventDefault();
		    $queryAPI.query(d.querySelector('.searchbox').value);
		}, false);
    }]);


})(window,document,window.angular,'myApp','controllers');