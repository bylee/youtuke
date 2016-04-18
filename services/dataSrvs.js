angular.module("youtukeApp.data.srvs", [])
    .service("fetchData", ["$http", "$log", function($http, $log) {

        // contains search results
        var results;

        // contains related videos
        var related;

        // makes a GET request
        this.getRequest = function (term, num, cid, rltd) {
            $http.get("https://www.googleapis.com/youtube/v3/search", {
                params: {
                    key: "AIzaSyD7pj4bc7AI9CyOUQdaeZ09kt2J5iSl9Eo",
                    part: "snippet",
                    type: "video",
                    q: term,
                    maxResults: num,
                    order: "relevance",
                    videoCategoryId: cid,
                    relatedToVideoId: rltd
                }
            }).then(function (response) {
                if (rltd) {
                    related = response.data.items;
                } else {
                    results = response.data.items;
                }
            }, function (error ) {
                $log.error(error);
            });
        };

        // return search results
        this.outputData = function () {
            return results;
        };
        // return related videos
        this.outputRelatedData = function () {
            return related;
        };
    }]);
