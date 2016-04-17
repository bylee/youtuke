angular.module("youtukeApp", ["ngRoute", "ngCookies", "youtukeApp.data.srvs", "youtukeApp.plst.srvs", "youtukeApp.filters", "youtukeApp.ctrl"])
    .constant("apiKey", "AIzaSyD7pj4bc7AI9CyOUQdaeZ09kt2J5iSl9Eo")
    .constant("apiUrl", "https://www.googleapis.com/youtube/v3/search")
    .config(function ($routeProvider) {
        $routeProvider
        .when("/results", {
            templateUrl: "/views/results.html"
        })
        .when("/related", {
            templateUrl: "/views/related.html"
        })
        .otherwise({
            templateUrl: "/views/results.html"
        });
    })
    .run(function () {
        var tag = document.createElement('script');
        tag.src = "http://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    });