angular.module("youtukeApp.ctrl", [])
    .controller("youtukeCtrl",["$scope", "fetchData", "playList", function ($scope, fetchData, playList) {

        // contains data to be seen in the view
        $scope.data = {
            // search results
            videos: [],

            // related videos
            relatedVideos: []
        };

        // search result number
        $scope.pageSize = 5;

        // store values for ng-show and ng-class
<<<<<<< HEAD
        $scope.currentPage = 1;
=======
        $scope.resultsPagination = 1;
        $scope.relatedPagination = 1;
        $scope.playlistPagination = 1;
>>>>>>> gh-pages
        $scope.currentTab = "results";
        $scope.whichTab = "player";
        $scope.playerStatus = "pause";

        // change values for ng-show and ng-class
        $scope.changeValues = function (target, newValue) {
            $scope[target] = newValue;
        };
        // apply the class for ng-show and ng-class
        $scope.changeClass = function (target, newValue) {
            return $scope[target] == newValue ? "active" : "";
        };

        // watching the values
        $scope.$watch(function () {
            // video list
            $scope.data.videos = fetchData.outputData();
            $scope.data.relatedVideos = fetchData.outputRelatedData();

            // current video title
            $scope.nowPlaying = playList.displayNowPlaying();

            // user playlist
            $scope.playList = playList.displayList();

            // youtube player status
            $scope.status = playList.playerStatus();

            // youtube playback status
            $scope.playerStatus = playList.playbackStatus();
        });

        // load the initial result page and execute the search
        $scope.makeRequest = function () {
            // search term
            var searchTerm = this.query || "";

            // searching dialog box
            if ($scope.data.videos) {
                Materialize.toast('Searching for ' + searchTerm + "...", 750);
            }

            // getting the data from the server
            fetchData.getRequest(searchTerm, 25, "10", null);

            // change the view
            $scope.currentTab = "results";
        };

        // add the video and start playing the video
        $scope.playButton = function (id, title) {
            // once the youtube player is ready
            if ($scope.status) {
                // add the song and start playing
                playList.addtoList(id, title);
                playList.startPlaying(id, title);

                // change the view
                $scope.currentTab = "related";
            }
            $scope.playerStatus = 'playing';
        };

        // just add the video to the playlist
        $scope.addButton = function (id, title) {
            playList.addtoList(id, title);
            $scope.listCtrl = playList.listControl();
            if ($scope.listCtrl == false) {
                Materialize.toast(title + ' is already in the playlist!', 1000);
            } else if ($scope.listCtrl == true) {
                Materialize.toast(title + ' was added to the playlist!', 1000);
            }
        };

        // start playing the video in the playlist
        $scope.resultPlayButton = function (id, title) {
            Materialize.toast('Now playing: ' + title, 1000);
            // once the youtube player is ready
            if ($scope.status) {
                playList.startPlaying(id, title);
            }
            $scope.playerStatus = 'playing';
        };

        // remove the video from the playlist
        $scope.removeButton = function (id, title) {
            playList.removefromList(id);
            Materialize.toast(title + ' was removed!!!', 1000);
        };

        // playback controls
        $scope.play = function () {
            playList.playVideo();
        };
        $scope.pause = function () {
            playList.pauseVideo();
        };
        $scope.next = function () {
            playList.nextVideo();
            $scope.playerStatus = 'playing';
        };
        $scope.prev = function () {
            playList.prevVideo();
            $scope.playerStatus = 'playing';
        };
        $scope.backward = function () {
            playList.backward();
        };
        $scope.forward = function () {
            playList.forward();
        };
<<<<<<< HEAD
=======

        // event callbacks for playlist drag and drop
        $scope.sortableOptions = {
            stop: function () {
                playList.updateCookies();
            }
        };
>>>>>>> gh-pages
    }]);